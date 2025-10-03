// Prevents additional console window on Windows in release.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod utils;

fn main() {
    utils::boot();
    intune_packager_lib::run()
}
