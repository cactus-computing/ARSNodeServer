# Configuration settings for the raspberry pi
This is a specification of the settings used to let the UART port open for the gps to send signal.

## Edditing cmdline.txt

Edit file by typing
```
sudo nano /boot/cmdline.txt
```
and delete `console=ttyS0, 114200` sentence. You can save by pressing Ctrl X, the Y to accept and enter.

## Edditing inittab file
Now we need to change the file
```
sudo nano /etc/inittab
```
and comment out the line which has `ttyS0` in it by placing a # symbol before that line.

> REBOOT YOUR PI

## Install GPS software

Type

```
sudo apt-get install gpsd gpsd-clients
```
to install software.

## Testing GPS 

Type the following commands on a terminal window on your pi

```
stty -F /dev/ttyS0 9600
```

start GPSD by running

```
sudo gpsd /dev/ttyS0 -F /ver/run/gpsd.sock
```

display GPS info by typing

```
cgps -s
```






