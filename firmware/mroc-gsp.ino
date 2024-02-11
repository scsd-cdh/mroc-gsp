#include <Wire.h>

// Telecommands
#define CMD_NEXT_EXPERIMENT_PHASE   0x01
#define CMD_RUN_EXPERIMENT_PHASE    0x02
#define CMD_SET_LED_STATE           0x03
#define CMD_TEST_SYSTEM_HEALTH      0x04
#define CMD_SET_STATE_IDLE          0x05
#define CMD_RESET                   0x55
#define CMD_TC_MAX                  0x7F

// Telemetry Request
#define CMD_SYSTEM_STATUS           0x80
#define CMD_EXPERIMENT_STATUS       0x81
#define CMD_HARDWARE_HEALTH_STATUS  0x82
#define CMD_ENVIRONMENT_INFORMATION 0x83
#define CMD_PHOTOSENSOR_RESULTS     0x84
#define CMD_TELECOMMAND_ACKNOWLEDGE 0x85

#define SLAVE_ADDR                  0x48

#define SYSTEM_STATUS_BUF_LEN       5
#define EXPERIMENT_STATUS_BUF_LEN   5
#define HARDWARE_HEALTH_BUF_LEN     7
#define ENV_INFO_BUF_LEN            8
#define SENSOR_RESULTS_BUF_LEN      2
#define TC_ACK_BUF_LEN              2

void sendTransfer(uint8_t cmd) {
  Wire.beginTransmission(SLAVE_ADDR);
  Wire.write(cmd);
  Wire.endTransmission();
}

void setup() {
  // Turn LED connected to pin 13 on Teensy to show the board is connected.
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);

  // Setup Communication
  Serial.begin(115200);
  Wire.begin();
}

void loop(){  
  while (Serial.available() > 0) {
    // uint8_t cmd = Serial.read();
    uint8_t cmd = Serial.read();
    uint8_t arg = 0;
    uint8_t counter = 0;
    if(cmd == CMD_RUN_EXPERIMENT_PHASE) {
      arg = Serial.read();

      Wire.beginTransmission(SLAVE_ADDR);
      Wire.write(cmd);
      Wire.write(arg);
      Wire.endTransmission();
    } else if (cmd == CMD_SET_LED_STATE) {
      arg = Serial.read();

      Wire.beginTransmission(SLAVE_ADDR);
      Wire.write(cmd);
      Wire.write(arg);
      Wire.endTransmission();
    } else if (cmd == CMD_SYSTEM_STATUS) {
      sendTransfer(0x80);
      Wire.requestFrom(SLAVE_ADDR, SYSTEM_STATUS_BUF_LEN);

      while(Wire.available() != SYSTEM_STATUS_BUF_LEN);
      
      while(counter < SYSTEM_STATUS_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else if(cmd == CMD_EXPERIMENT_STATUS) {
      sendTransfer(0x81);
      Wire.requestFrom(SLAVE_ADDR, EXPERIMENT_STATUS_BUF_LEN);

      while(Wire.available() != EXPERIMENT_STATUS_BUF_LEN);
      while(counter < EXPERIMENT_STATUS_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else if (cmd == CMD_HARDWARE_HEALTH_STATUS) {
      sendTransfer(cmd);
      Wire.requestFrom(SLAVE_ADDR, HARDWARE_HEALTH_BUF_LEN);

      while(Wire.available() != HARDWARE_HEALTH_BUF_LEN);
      while(counter < HARDWARE_HEALTH_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else if (cmd == CMD_ENVIRONMENT_INFORMATION) {
      sendTransfer(cmd);
      Wire.requestFrom(SLAVE_ADDR, ENV_INFO_BUF_LEN);

      while(Wire.available() != ENV_INFO_BUF_LEN);
      while(counter < ENV_INFO_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else if (cmd == CMD_PHOTOSENSOR_RESULTS) {
      sendTransfer(cmd);
      Wire.requestFrom(SLAVE_ADDR, SENSOR_RESULTS_BUF_LEN);

      while(Wire.available() != SENSOR_RESULTS_BUF_LEN);
      while(counter < SENSOR_RESULTS_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else if (cmd == CMD_TELECOMMAND_ACKNOWLEDGE) {
      sendTransfer(cmd);
      Wire.requestFrom(SLAVE_ADDR, TC_ACK_BUF_LEN);

      while(Wire.available() != TC_ACK_BUF_LEN);
      while(counter < TC_ACK_BUF_LEN) {
        Serial.write(Wire.read());
        counter ++;
      }
    } else {
      sendTransfer(cmd);
    }
  }
}
