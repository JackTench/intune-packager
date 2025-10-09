pub mod download;
pub mod intune;
pub mod utils;

use crate::intune::{launch_win32_content_prep_tool, package_app};

// Entry point for Tauri.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            js_package_app,
            js_launch_win32_content_prep_tool
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn js_package_app(arg: String) {
    package_app(arg).expect("Failed to launch Win32 Content Prep Tool.");
}

#[tauri::command]
fn js_launch_win32_content_prep_tool() {
    launch_win32_content_prep_tool().expect("Failed to launch Win32 Content Prep Tool.");
}
