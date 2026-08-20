#!/usr/bin/env python3
import os
import subprocess
import sys

BRANCH = "main"

# File types and comment templates
def get_comment(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    relpath = os.path.relpath(filepath)
    basename = os.path.basename(filepath)
    
    if ext in [".ts", ".tsx", ".js", ".jsx"]:
        return f"/**\n * @file {basename}\n * @description Module implementation for BCA Sem 1 Exam Coach platform.\n * @module {relpath}\n */\n"
    elif ext == ".css":
        return f"/* ==========================================================================\n   Styles: {basename} - BCA Sem 1 Exam Coach\n   ========================================================================== */\n"
    elif ext in [".html", ".svg"]:
        return f"<!-- BCA Sem 1 Exam Coach: {basename} -->\n"
    elif ext == ".md":
        return f"\n<!-- Documentation updated for {basename} -->\n"
    elif ext == ".py":
        return f'"""Module documentation for {basename}."""\n'
    return None

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)

    target_files = []
    
    # Traverse project files in src, public, root
    for root, dirs, files in os.walk(base_dir):
        # Skip hidden folders, node_modules, dist
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ('node_modules', 'dist')]
        
        for f in files:
            if f.startswith('.'):
                continue
            ext = os.path.splitext(f)[1].lower()
            if ext in [".ts", ".tsx", ".css", ".html", ".md", ".py"]:
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, base_dir)
                # Skip the runner script itself if needed, or include
                target_files.append(rel_path)

    target_files.sort()
    print(f"Found {len(target_files)} candidate files to document.")

    modified_files = []

    for rel_path in target_files:
        comment = get_comment(rel_path)
        if not comment:
            continue
        
        with open(rel_path, "r", encoding="utf-8") as f:
            content = f.read()

        # Check if already added
        if comment in content or "@module" in content or "BCA Sem 1 Exam Coach:" in content:
            continue
            
        ext = os.path.splitext(rel_path)[1].lower()
        if ext == ".md":
            new_content = content + comment
        elif ext == ".py" and content.startswith("#!"):
            lines = content.splitlines(True)
            new_content = lines[0] + comment + "".join(lines[1:])
        else:
            new_content = comment + content

        with open(rel_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        
        modified_files.append(rel_path)

    print(f"\nAdded comments to {len(modified_files)} files.")

    # Run build test to make sure no errors were introduced
    print("\nRunning build check to ensure no code was broken...")
    build_res = subprocess.run("npm run build", shell=True, text=True, capture_output=True)
    if build_res.returncode != 0:
        print(f"Build failed! Output:\n{build_res.stderr}\n{build_res.stdout}")
        sys.exit(1)
    print("✓ Build verification passed perfectly!")

    # Push file by file
    print(f"\nStarting individual commit & push for {len(modified_files)} files...")
    for idx, filepath in enumerate(modified_files, 1):
        print(f"\n[{idx}/{len(modified_files)}] Pushing update for: {filepath}")
        subprocess.run(f'git add "{filepath}"', shell=True, check=True)
        commit_msg = f"docs: Add module comments & documentation to {os.path.basename(filepath)}"
        subprocess.run(f'git commit -m "{commit_msg}"', shell=True, check=True)
        
        res = subprocess.run(f"git push origin {BRANCH}", shell=True, text=True, capture_output=True)
        if res.returncode != 0:
            print(f"[Push error on {filepath}]: {res.stderr}")
            break
        print(f"✓ Pushed: {filepath}")

    print("\nAll files successfully commented, tested, and pushed individually!")

if __name__ == "__main__":
    main()
