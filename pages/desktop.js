import React from "react";
//
export default function Desktop() {
  const downloads = [
    {
      platform: "Mac (Intel)",
      file: "app-mac-intel.dmg",
      shaSum: "abc123def456ghi789",
      signature: "signature-mac-intel.sig",
    },
    {
      platform: "Mac (ARM64)",
      file: "app-mac-arm64.dmg",
      shaSum: "xyz987uvw654rst321",
      signature: "signature-mac-arm64.sig",
    },
    {
      platform: "Windows",
      file: "app-windows.exe",
      shaSum: "lmn456opq123stu789",
      signature: "signature-windows.sig",
    },
    {
      platform: "Linux (x86_64)",
      file: "app-linux-x86_64.tar.gz",
      shaSum: "qrs789tuv456wxy123",
      signature: "signature-linux-x86_64.sig",
    },
  ];

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        marginTop: "80px",
      }}
    >
      <h1>Download Our Application</h1>
      <p>Select your platform below to download the application:</p>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Platform
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Download
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              SHA256 Checksum
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>
              Signature
            </th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((download, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {download.platform}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={`/${download.file}`} download>
                  {download.file}
                </a>
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {download.shaSum}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <a href={`/${download.signature}`} download>
                  {download.signature}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
