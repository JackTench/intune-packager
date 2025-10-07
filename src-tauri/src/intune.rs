use std::{path::PathBuf, process::Command};

use crate::utils::get_data_directory;

pub fn package(c: PathBuf, s: PathBuf, o: PathBuf) {
    // Get path of the exe.
    let mut path = get_data_directory();
    path.push("Microsoft-Win32-Content-Prep-Tool");
    path.push("IntuneWinAppUtil.exe");

    let _ = Command::new(path)
        .arg("-c")
        .arg(c)
        .arg("-s")
        .arg(s)
        .arg("-o")
        .arg(o)
        .status()
        .expect("Failed to launch Win32 Content Prep Tool.");
}
