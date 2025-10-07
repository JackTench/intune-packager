use std::{path::PathBuf, process::Command};

use crate::utils::get_data_directory;

pub fn package(c: PathBuf, s: PathBuf, o: PathBuf) {
    // Get path of the exe.
    let mut path = get_data_directory();
    path.push("Microsoft-Win32-Content-Prep-Tool");
    path.push("IntuneWinAppUtil.exe");

    // Package app using Win32 Content Prep Tool.
    let _ = Command::new("cmd")
        .args([
            "/C",
            "start",
            "/wait",
            "",
            path.to_str().unwrap(),
            "-c",
            c.to_str().unwrap(),
            "-s",
            s.to_str().unwrap(),
            "-o",
            o.to_str().unwrap(),
        ])
        .status()
        .expect("Failed to launch Win32 Content Prep Tool.");
}
