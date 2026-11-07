---
title: Windows 7
description: What is verified on Windows 7 SP1 through Windows 11, how the builds are made, and what to do on a PC without an OpenGL driver.
---

Many workshop PCs run Windows 7, often the 32-bit edition. Rajutara treats Windows 7 SP1 as its floor, so both a 64-bit and a 32-bit build ship, as an `.msi` installer and a portable `.zip` each. The same files run on Windows 10 and 11.

## What is verified

- The Windows builds run under Wine on the Linux reference machine, which renders with Mesa software OpenGL. Each build starts, reports its version and passes the `--smoke` check.
- Every build passes an import-table check: no dependency may require an API newer than Windows 7, such as the wait functions, DirectX 12 or WinRT. The check is part of the release.
- **Not yet verified: a real Windows 7 PC.** The run on real hardware, with the vendor GPU driver, the file dialogs and the installer, is the release gate that is still pending. Until it passes, treat Windows 7 as expected to work, not as proven.

The 32-bit builds address at most about 2 GB, and the memory budgets of the program apply unchanged. Accessibility support can be absent from a Windows 7 build if the smoke run shows it failing there, in which case the release notes say so.

## How it is built

Rust's current stable targets need Windows 10, so the Windows builds use the Windows 7 targets of Rust, `x86_64-win7-windows-gnu` and `i686-win7-windows-gnu`. They are cross-built on Linux with a pinned nightly toolchain and MinGW. The toolchain lives with the maintainer, not in the repository, and so do the Windows packages' build scripts. A pull request that touches windowing, dialogs, the file system or dependencies says so, and the maintainer runs the Windows check.

The window is drawn through OpenGL 2.1 (the `glow` renderer of eframe), not Vulkan or DirectX, because that is what Windows 7 and integrated graphics provide.

## No OpenGL driver

Some Windows 7 machines have no usable graphics driver: a virtual machine with a standard VGA adapter, a remote desktop session, or an OEM driver that is broken. Windows then exposes only OpenGL 1.1, and a program that needs 2.1 cannot open a window. Rajutara shows a message that names the problem and the fix, and exits with a non-zero status.

The fix is a software OpenGL that ships in the Windows packages, in a `software-gl/` folder. It is Mesa 3D with the llvmpipe renderer, unmodified, from the mesa-dist-win builds.

1. Run `rajutara.exe --smoke`. If it prints a JSON line and exits 0, you do not need this.
2. If the program says it cannot create an OpenGL context, copy `opengl32.dll` and `libgallium_wgl.dll` from `software-gl/` to the folder that holds `rajutara.exe`.
3. Start the program again. It runs on the CPU, so it is slower, but it runs.
4. After you install a graphics driver, delete the two files again so the program uses the hardware.

The files are not beside the program by default, so machines with a working driver keep the hardware renderer. Mesa's own licence file ships with them, and `THIRD-PARTY.html` lists Mesa.
