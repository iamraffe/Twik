require 'os'

if OS.mac?
  WickedPdf.config = {
    dpi: 380,
    exe_path: '/usr/local/bin/wkhtmltopdf'
  }
else
  WickedPdf.config = {
    dpi: 96
  }
end
