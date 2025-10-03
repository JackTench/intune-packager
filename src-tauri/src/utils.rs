use std::{fs::create_dir_all, path::PathBuf};

use dirs::data_local_dir;

pub fn boot() {
    // Call get_data_directory() so it creates the directory on first launch.
    get_data_directory();
}

pub fn get_data_directory() -> PathBuf {
    // Use dirs to find the data directory.
    let mut path = data_local_dir().expect("Failed to find the user's local data directory.");
    path.push("intune-packager");

    // Create the data directory if it does not already exist.
    if !path.exists() {
        create_dir_all(&path).expect("Failed to create the data directory.");
    }

    path
}
