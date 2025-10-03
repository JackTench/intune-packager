use git2::Repository;

use crate::utils;

const URL: &str = "https://github.com/microsoft/Microsoft-Win32-Content-Prep-Tool";
const REPO: &str = "Microsoft-Win32-Content-Prep-Tool";

pub fn download_win32_content_prep_tool() {
    // Get data directory to download to.
    let mut path = utils::get_data_directory();
    path.push(REPO);

    // Get repository.
    if !path.exists() {
        Repository::clone(URL, path).expect("Failed to download the Microsoft tool.");
    }
}
