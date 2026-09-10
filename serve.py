"""Serve only this game folder for browsers on the same local network."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import socket

ROOT = Path(__file__).resolve().parent


class GameHandler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp'}

    def log_message(self, *_args):
        pass  # Do not record device addresses or requests.

    def list_directory(self, _path):
        self.send_error(403, 'Directory listing is disabled')
        return None

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache')
        super().end_headers()


def main():
    try:
        server = ThreadingHTTPServer(('0.0.0.0', 8000), partial(GameHandler, directory=str(ROOT)))
    except OSError as error:
        print('Could not start on port 8000. Close another server using that port and try again.')
        print(error)
        return
    print('Why do I cry? — local game server')
    print('PC: http://localhost:8000/')
    try:
        addresses = sorted({item[4][0] for item in socket.getaddrinfo(socket.gethostname(), None, family=socket.AF_INET) if not item[4][0].startswith('127.')})
    except socket.gaierror:
        addresses = []
    if addresses:
        for address in addresses:
            print(f'Phone on the same Wi-Fi: http://{address}:8000/')
    else:
        print('Phone: use http://YOUR-PC-WIFI-IP:8000/ (find the Wi-Fi IPv4 address in your PC network settings).')
    print('Keep this window open while playing. Press Ctrl+C to stop.')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
