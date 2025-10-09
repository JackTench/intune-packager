use std::{fs::rename, path::PathBuf, process::Command};

use native_dialog::FileDialog;

use crate::utils::get_data_directory;

pub fn launch_win32_content_prep_tool() -> anyhow::Result<()> {
    // Get path of the exe.
    let path = get_data_directory()?
        .join("Microsoft-Win32-Content-Prep-Tool")
        .join("IntuneWinAppUtil.exe");

    // Convert to string for the command line.
    let exe_path = path.to_str().expect("Invalid path to exe.");

    let _ = Command::new("cmd")
        .args(["/C", "start", "", exe_path])
        .status()
        .expect("Failed to launch Win32 Content Prep Tool.");

    Ok(())
}

pub fn package_app(arg: String) -> anyhow::Result<()> {
    // Get path(s) of exe and parent folder.
    let exe_path = PathBuf::from(arg);
    let folder_path = exe_path.parent().unwrap().to_path_buf();

    // Dialog box to save file.
    let save_path = FileDialog::new()
        .set_location(&folder_path)
        .add_filter("Intune Package", &["intunewin"])
        .show_save_single_file()
        .unwrap()
        .unwrap();
    let output_dir = save_path.parent().unwrap().to_path_buf();

    // Create package.
    package(folder_path.clone(), exe_path.clone(), output_dir.clone())?;

    // Rename output to match save box.
    let generated_path = output_dir.join(format!(
        "{}.intunewin",
        exe_path.file_stem().unwrap().to_string_lossy()
    ));
    if generated_path.exists() {
        rename(&generated_path, &save_path).expect("Failed to rename output file.")
    }

    Ok(())
}

fn package(c: PathBuf, s: PathBuf, o: PathBuf) -> anyhow::Result<()> {
    // Get path of the exe.
    let mut path = get_data_directory()?;
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

    Ok(())
}
