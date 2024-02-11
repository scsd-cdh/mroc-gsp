// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use std::time::Duration;
use serialport::{available_ports, SerialPortInfo};

#[tauri::command]
fn get_ports() -> Vec<String> {
    return if let Ok(ports) = available_ports() {
        ports
        .iter()
        .map(get_port_name)
        .collect::<Vec<String>>()
    } else {
        vec![]
    }
}

#[tauri::command]
fn send_command(port: &str, command: usize) {
    match serialport::new(port, 115_200)
                .timeout(Duration::from_millis(10))
                .open() {
        Ok(mut p) => {
            if p.write(&[command as u8]).is_ok() {}
        },
        Err(e) => {
            println!("Error: {}", e);
        }
    }
}

#[tauri::command]
fn read(port: &str, len: usize) -> Vec<u8> {
    let mut serial_buf: Vec<u8> = vec![0; len];
    match serialport::new(port, 115_200)
                .timeout(Duration::from_millis(10))
                .open() {
        Ok(mut p) => {
            if let Ok(_bytes_read) = p.read_exact(serial_buf.as_mut_slice()) {}
        },
        Err(e) => {
            println!("Error: {}", e);
        }
    }
    serial_buf
}

fn get_port_name(port: &SerialPortInfo) -> String {
    port.clone().port_name
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_ports, send_command, read])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
