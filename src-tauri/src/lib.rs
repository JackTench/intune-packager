pub mod download;
pub mod utils;

use std::{path::PathBuf, process::Command};

use crate::utils::get_data_directory;

// Entry point for Tauri.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            launch_win32_content_prep_tool,
            test_print
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// DEBUG: Function just prints 1 str argument passed from the JS side.
#[tauri::command]
fn test_print(arg: String) {
    let path = PathBuf::from(arg);
    println!("{:?}", path);
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
