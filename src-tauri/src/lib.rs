pub mod download;
pub mod intune;
pub mod utils;

use std::{path::PathBuf, process::Command};

use native_dialog::FileDialog;

use crate::{intune::package, utils::get_data_directory};

// Entry point for Tauri.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            package_app,
            launch_win32_content_prep_tool
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn package_app(arg: String) {
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

    // Create package.
    package(folder_path, exe_path, save_path);
}

#[tauri::command]
fn launch_win32_content_prep_tool() {
    // Get path of the exe.
    let mut path = get_data_directory();
    path.push("Microsoft-Win32-Content-Prep-Tool");
    path.push("IntuneWinAppUtil.exe");

    // Convert to string for the command line.
    let exe_path = path.to_str().expect("Invalid path to exe.");

    let _ = Command::new("cmd")
        .args(["/C", "start", "", exe_path])
        .status()
        .expect("Failed to launch Win32 Content Prep Tool.");
}
