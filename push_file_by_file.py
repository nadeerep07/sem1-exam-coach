#!/usr/bin/env python3
"""Module documentation for push_file_by_file.py."""
import subprocess
import os
import sys

REPO_REMOTE = "https://github.com/nadeerep07/sem1-exam-coach.git"
BRANCH = "main"

def run_cmd(cmd, check=True):
    print(f"➜ Running: {cmd}")
    res = subprocess.run(cmd, shell=True, text=True, capture_output=True)
    if res.stdout.strip():
        print(res.stdout.strip())
    if res.stderr.strip():
        print(f"[stderr] {res.stderr.strip()}", file=sys.stderr)
    if check and res.returncode != 0:
        raise RuntimeError(f"Command failed with exit code {res.returncode}: {cmd}")
    return res

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(base_dir)
    print(f"Working Directory: {base_dir}")

    # 1. Initialize git if not a git repository in this folder
    if not os.path.exists(os.path.join(base_dir, ".git")):
        print("Initializing git repository...")
        run_cmd("git init")
    else:
        print("Git repository already initialized.")

    # 2. Rename branch to main
    run_cmd(f"git branch -M {BRANCH}", check=False)

    # 3. Configure remote origin
    remotes = subprocess.run("git remote -v", shell=True, text=True, capture_output=True).stdout
    if "origin" in remotes:
        print("Updating origin remote URL...")
        run_cmd(f"git remote set-url origin {REPO_REMOTE}")
    else:
        print("Adding origin remote...")
        run_cmd(f"git remote add origin {REPO_REMOTE}")

    # 4. Get list of files to commit (untracked + modified files)
    # Using git status --porcelain to find all changes, or finding all files
    status_output = subprocess.run("git status --porcelain -uall", shell=True, text=True, capture_output=True).stdout
    
    files_to_commit = []
    for line in status_output.splitlines():
        if not line.strip():
            continue
        # Extract filename (handle quotes/spaces if needed)
        status_code = line[:2]
        filepath = line[3:].strip().strip('"')
        
        # Skip script itself if wanted or include it
        if filepath:
            files_to_commit.append(filepath)

    if not files_to_commit:
        print("No files to commit! Checking if there are unpushed commits...")
        run_cmd(f"git push -u origin {BRANCH}", check=False)
        print("Done!")
        return

    print(f"\nFound {len(files_to_commit)} file(s) to commit and push one by one:")
    for f in files_to_commit:
        print(f" - {f}")
    print("-" * 50)

    # 5. Commit and push one by one
    for idx, filepath in enumerate(files_to_commit, 1):
        print(f"\n[{idx}/{len(files_to_commit)}] Processing: {filepath}")
        
        # Git add single file
        run_cmd(f'git add "{filepath}"')
        
        # Commit single file
        commit_msg = f"Add {filepath}"
        run_cmd(f'git commit -m "{commit_msg}"', check=False)
        
        # Push to remote
        print(f"Pushing {filepath} to {BRANCH}...")
        res = run_cmd(f"git push -u origin {BRANCH}", check=False)
        if res.returncode != 0:
            print(f"Warning: Push failed for {filepath}. Please check GitHub authentication/permissions.")
            break
        print(f"✓ Successfully pushed: {filepath}")

    print("\n All operations completed successfully!")

if __name__ == "__main__":
    main()
