use std::fs::remove_file;

use git2::Repository;

use crate::utils::get_data_directory;

const URL: &str = "https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool";
const REPO: &str = "Microsoft-Win32-Content-Prep-Tool";

pub fn download_win32_content_prep_tool() -> anyhow::Result<()> {
    // Get data directory to download to.
    let path = get_data_directory()?.join(REPO);

    // Get repository.
    if !path.exists() {
        Repository::clone(URL, path)?;
    }
    cleanup_git_repo_files()?;

    Ok(())
}

fn cleanup_git_repo_files() -> anyhow::Result<()> {
    let folder = get_data_directory()?.join(REPO);

    // Files to remove.
    let files_to_remove = [
        "Microsoft License Terms For Win32 Content Prep Tool.pdf",
        "README.md",
        "ReleaseNotes.txt",
        "SECURITY.md",
    ];

    // Remove files.
    for file in files_to_remove {
        let file_path = folder.join(file);
        let _ = remove_file(&file_path);
    }

    Ok(())
}
