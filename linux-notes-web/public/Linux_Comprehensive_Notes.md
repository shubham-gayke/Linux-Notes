## Table of Contents

1. [Operating System (OS) Basics](#chapter-1-operating-system-os-basics)
2. [Linux Introduction & History](#chapter-2-linux-introduction--history)
3. [Linux Architecture](#chapter-3-linux-architecture)
4. [Virtualization & Hypervisors](#chapter-4-virtualization--hypervisors)
5. [Linux Prompt & Shell Basics](#chapter-5-linux-prompt--shell-basics)
6. [Basic Linux Commands](#chapter-6-basic-linux-commands)
7. [File Creation Methods](#chapter-7-file-creation-methods)
8. [Vim Editor (Complete Guide)](#chapter-8-vim-editor-complete-guide)
9. [File Read Operations](#chapter-9-file-read-operations)
10. [Linux Directory Structure](#chapter-10-linux-directory-structure)
11. [User and Group Management](#chapter-11-user-and-group-management)
12. [File Permissions](#chapter-12-file-permissions)
13. [sudo — Superuser Access](#chapter-13-sudo--superuser-access)
14. [Job Scheduling and Automation](#chapter-14-job-scheduling-and-automation)
15. [Archive and Compression](#chapter-15-archive-and-compression)
16. [Package Management](#chapter-16-package-management)
17. [Disk Partitioning & LVM](#chapter-17-disk-partitioning--lvm)
18. [Networking Fundamentals](#chapter-18-networking-fundamentals)
19. [OSI Model](#chapter-19-osi-model)
20. [IP Addressing & Subnetting](#chapter-20-ip-addressing--subnetting)
21. [Network Configuration (Practical)](#chapter-21-network-configuration-practical)
22. [Firewall Management](#chapter-22-firewall-management)
23. [SSH — Secure Shell](#chapter-23-ssh--secure-shell)
24. [Log Management](#chapter-24-log-management)
25. [Process Management](#chapter-25-process-management)
26. [Text Processing & Filters](#chapter-26-text-processing--filters)
27. [Shell Scripting Basics](#chapter-27-shell-scripting-basics)

---

## Chapter 1: Operating System (OS) Basics

### What is an Operating System?

An **Operating System (OS)** is essential system software that manages a computer's hardware and software resources. It acts as an **intermediary** between the user and the hardware — without it, a computer cannot function.

```
User ──► Operating System ──► Hardware
```

**Examples:** Windows, macOS, Linux, Android, iOS

### Core Functions of an Operating System

| Function | Description |
|---|---|
| Process Management | Creates, schedules, and terminates processes |
| Memory Management | Allocates and deallocates RAM to programs |
| File System Management | Organizes data on disks (read, write, delete) |
| Device Management | Controls hardware via device drivers |
| Security | Controls user access, authentication, and protection |
| User Interface | Provides CLI or GUI for interaction |
| Networking | Manages network connections and protocols |
| Error Detection | Detects and recovers from hardware/software errors |

> **In short:** Without an operating system, a computer is just hardware — it cannot work.

### Types of Operating Systems

**1. Desktop Operating System**
Designed for personal computers (laptops/desktops). Serves **one user at a time**.
- **Examples:** Windows 10/11, macOS, Android

**2. Server Operating System**
Designed to run on servers, providing services to **multiple clients simultaneously** (e.g., web hosting, file sharing, databases).
- **Examples:** Linux (RHEL, Ubuntu Server, CentOS), Kali Linux, Fedora Server, Windows Server

### Evolution of Operating Systems

| Generation | Capability | Example |
|---|---|---|
| 1st Gen | Single user → Single task → One at a time | MS-DOS |
| 2nd Gen | Single user → Multiple tasks → Simultaneously | Windows |
| 3rd Gen | Multiple users → Multiple tasks → Simultaneously | Linux, Unix |

### Operating System vs Kernel

Many people confuse these:

- **Kernel** = the core engine of the OS (manages hardware directly)
- **OS** = Kernel + Shell + Utilities + Applications

```os-architecture
  layer: Applications (vim, firefox)
  layer: Shell (bash, zsh)
  layer: Kernel (Core of OS)
  layer: Hardware
```

---

## Chapter 2: Linux Introduction & History

### What is Linux?

**Linux** is a **free, open-source** operating system based on Unix. It is known for its stability, security, and flexibility. Linux powers the majority of the world's servers, smartphones (Android), supercomputers, and cloud infrastructure.

### History of Linux

| Year | Event |
|---|---|
| 1969 | ARPANET created (predecessor of internet) |
| 1970 | **Unix** created by **Ken Thompson** and **Dennis Ritchie** at AT&T Bell Labs |
| 1983 | Richard Stallman starts the GNU Project (free software tools) |
| 1991 | **Linus Torvalds** creates the Linux kernel (version 0.01) |
| 1994 | Linux kernel 1.0 released |
| 1998–2000 | Major companies (IBM, Oracle) adopt Linux |
| Present | Powers 90%+ of internet servers, all top 500 supercomputers, and Android |

**Name origin:** Linux = **Linus** + **Unix** = **Linux**

### About Unix

Unix is the ancestor of Linux. It was the first truly powerful multiuser, multitasking operating system.

- Created in **1970** by **Ken Thompson** and **Dennis Ritchie** at **AT&T Bell Labs**
- Written in C language (also created at Bell Labs)
- Led to the creation of many modern OSes including macOS, Linux, and BSD

### Key Features of Linux

| Feature | Description |
|---|---|
| **Free & Open Source** | Source code is publicly available; can be modified freely |
| **Security** | Robust permission system; less prone to malware |
| **Stability** | Runs for years without rebooting |
| **Multiuser** | Multiple users can work simultaneously |
| **Multitasking** | Runs multiple processes at the same time |
| **Portability** | Runs on almost any hardware (x86, ARM, RISC-V, etc.) |
| **Flexibility** | Customizable from minimal CLI to full desktop GUI |
| **Community Support** | Massive global developer and user community |
| **Package Management** | Easy software installation via package managers |

### Linux vs Unix vs Windows

| Feature | Unix | Linux | Windows |
|---|---|---|---|
| Developer | AT&T Bell Labs | Linus Torvalds | Microsoft |
| Type | Commercial/Proprietary | Open Source (GPL) | Proprietary |
| Licence | Paid | Free | Paid |
| Source Code | Closed | Open | Closed |
| Kernel | Unix Kernel | Linux Kernel | Windows NT Kernel |
| GUI | Limited/Optional | Optional (can use GNOME, KDE) | Strong built-in GUI |
| CLI | Very powerful | Very powerful (bash, zsh) | PowerShell/CMD |
| Security | Very strong | Very strong | Good but more vulnerable |
| Customizability | Low | Very High | Moderate |
| Cost | High | Free | $100–$200+ |
| Market Share (Servers) | ~5% | ~90%+ | ~5% |
| Examples | AIX, Solaris | Ubuntu, RHEL, CentOS | Windows 10, 11 |

---

## Chapter 3: Linux Architecture

### Overview

Linux has a layered architecture. Each layer has a specific role:

```
+------------------------------------------------------+
|                    USERS                             |
+------------------------------------------------------+
|              Applications / Utilities                |
|         (vim, bash, firefox, httpd, gcc)             |
+------------------------------------------------------+
|                   Shell (bash)                       |
|    (Interface between user and kernel)               |
+------------------------------------------------------+
|                    Kernel                            |
|  (Core: Process/Memory/File/Device Management)       |
+------------------------------------------------------+
|                   Hardware                           |
|         (CPU, RAM, HDD, NIC, GPU)                    |
+------------------------------------------------------+
```

### Components Explained

**1. Hardware Layer**
The physical devices of the system: CPU, RAM, HDD/SSD, Network Interface Card (NIC), GPU, keyboard, mouse. Linux manages all of these.

**2. Kernel**
The **core** of the Linux OS. It is the first program loaded when the system boots and remains in memory throughout. It handles:
- **Process Management** — creating, scheduling, and terminating processes
- **Memory Management** — virtual memory, RAM allocation (RAM + Swap)
- **File System Management** — ext4, xfs, NTFS file systems
- **Device Management** — via device drivers
- **System Calls** — programs request OS services through system calls

**3. Shell**
An interface between the user and the kernel. It accepts user commands, interprets them, and passes instructions to the kernel. Types of shells:

| Shell | Name | Default in |
|---|---|---|
| `bash` | Bourne Again Shell | Most Linux distros |
| `sh` | Bourne Shell | Original Unix shell |
| `zsh` | Z Shell | macOS (default), Kali Linux |
| `fish` | Friendly Interactive Shell | Optional |
| `csh` | C Shell | BSD systems |

**4. Applications / Utilities**
Programs that provide functionality to users. These include text editors (vim, nano), web servers (httpd/nginx), programming tools (gcc, python), and desktop environments (GNOME, KDE).

### Linux Distributions (Distros)

A **Linux distribution** is a complete OS built from the Linux kernel + shell + package manager + applications.

| Family | Distribution | Use Case |
|---|---|---|
| Red Hat | RHEL, CentOS, Fedora, AlmaLinux | Enterprise servers |
| Debian | Ubuntu, Debian, Kali Linux, Mint | Desktops, servers, security |
| SUSE | openSUSE, SLES | Enterprise (Europe) |
| Arch | Arch Linux, Manjaro | Advanced users, rolling release |
| Android | Android | Mobile devices |

> For DevOps, the most commonly used distros are **RHEL/CentOS** (enterprise) and **Ubuntu** (cloud/AWS).

---

## Chapter 4: Virtualization & Hypervisors

### What is Virtualization?

**Virtualization** is the process of creating a **virtual (software-based) version** of a computer system. One physical machine can run multiple virtual machines (VMs), each behaving like a completely independent computer with its own OS, CPU, RAM, and storage.

```
Physical Machine (Host)
├── Windows OS (Host OS)
│   └── VirtualBox (Hypervisor)
│       ├── VM1: Linux (CentOS) - 4GB RAM, 20GB HDD
│       ├── VM2: Ubuntu - 2GB RAM, 15GB HDD
│       └── VM3: Kali Linux - 2GB RAM, 20GB HDD
```

### Why Use Virtualization?

- **Cost savings** — run multiple servers on one physical machine
- **Isolation** — each VM is independent; one crashing doesn't affect others
- **Testing** — test software on different OSes without extra hardware
- **Snapshots** — save VM state and roll back if something breaks
- **Portability** — move VMs between physical hosts easily

### Four Major Types of Virtualization

| Type | Description | Example |
|---|---|---|
| **Server Virtualization** | Multiple virtual servers on one physical server | VMware ESXi |
| **Desktop Virtualization** | Run a desktop OS inside another OS | VirtualBox |
| **Storage Virtualization** | Pool multiple storage devices into one logical unit | SAN, NAS |
| **Network Virtualization** | Create virtual networks independent of hardware | VPN, VLAN |

### What is a Hypervisor?

A **hypervisor** (also called a Virtual Machine Monitor / VMM) is software that creates and manages virtual machines. It allocates physical resources (CPU, RAM, storage) to each VM.

### Types of Hypervisors

**Type 1 — Bare-Metal Hypervisor**

Installed **directly on hardware** — no host OS required. Provides the best performance.

```
Physical Hardware
└── Hypervisor (Type 1) ← installed directly
    ├── VM1: Linux
    ├── VM2: Windows
    └── VM3: macOS
```

| Property | Details |
|---|---|
| Performance | High (direct hardware access) |
| Use Case | Enterprise data centers, cloud providers |
| Examples | VMware ESXi, Microsoft Hyper-V, AWS Nitro, KVM |

**Type 2 — Hosted Hypervisor**

Installed as an **application on top of an existing OS**. Easier to use but has more overhead.

```
Physical Hardware
└── Host OS (Windows/macOS)
    └── Hypervisor Application (Type 2)
        ├── VM1: Linux
        └── VM2: Ubuntu
```

| Property | Details |
|---|---|
| Performance | Lower (passes through host OS) |
| Use Case | Personal use, development, learning |
| Examples | VirtualBox, VMware Workstation, Parallels |

### How VirtualBox Works

1. Installs on your existing OS (Windows/macOS) as an application
2. Shares hardware resources from the host machine
3. Each VM gets a separate virtual CPU, RAM, HDD, and NIC
4. VMs are fully isolated from the host and from each other

---

## Chapter 5: Linux Prompt & Shell Basics

### Understanding the Shell Prompt

When you log into Linux, the shell displays a **prompt** that provides key information:

**Root User Prompt:**
```bash
[root@vbox ~]#
```

| Part | Meaning |
|---|---|
| `root` | Current username (superuser) |
| `@` | Separator symbol |
| `vbox` | Hostname (machine name) |
| `~` | Current directory (`~` = home directory) |
| `#` | Root user indicator |

**Regular/Local User Prompt:**
```bash
[pallavi@vbox ~]$
```

| Part | Meaning |
|---|---|
| `pallavi` | Current username (local user) |
| `@` | Separator symbol |
| `vbox` | Hostname |
| `~` | Current directory (`~` = `/home/pallavi`) |
| `$` | Regular user indicator (NOT root) |

> **Rule:** `#` = root (superuser) | `$` = regular user

### Changing the Hostname

```bash
hostname                        # show current hostname
hostname newname                # change temporarily (resets on reboot)
hostnamectl set-hostname newname  # change permanently
hostnamectl                     # verify change
```

### Useful Keyboard Shortcuts in Shell

| Shortcut | Action |
|---|---|
| `Ctrl + C` | Interrupt / kill running command |
| `Ctrl + Z` | Suspend (pause) running command |
| `Ctrl + D` | Exit current shell or end input |
| `Ctrl + L` | Clear screen (same as `clear`) |
| `Ctrl + A` | Move cursor to beginning of line |
| `Ctrl + E` | Move cursor to end of line |
| `Tab` | Auto-complete command or filename |
| `↑ / ↓` | Navigate command history |

---

## Chapter 6: Basic Linux Commands

### System Information Commands

| Command | Description | Example Output |
|---|---|---|
| `whoami` | Show current username | `root` |
| `who` | Show logged-in users with login time | `root pts/0 2026-01-01 10:00` |
| `w` | Detailed info of all logged-in users | Shows CPU usage, idle time |
| `id` | Show UID, GID, and groups of current user | `uid=0(root) gid=0(root)` |
| `uname` | Show kernel name | `Linux` |
| `uname -r` | Show kernel version | `5.14.0-284.el9.x86_64` |
| `uname -a` | Show all system info | Full kernel + OS details |
| `uname -p` | Show processor type | `x86_64` |
| `uname -o` | Show OS type | `GNU/Linux` |
| `hostname` | Show hostname | `vbox` |
| `lscpu` | Detailed CPU information | Cores, threads, architecture |
| `free` | RAM usage in bytes | — |
| `free -h` | RAM usage in human-readable format | `7.6G / 15.6G` |
| `df -h` | Disk space usage (human-readable) | Shows all mounted filesystems |
| `df -hT` | Disk space with filesystem type | Shows ext4, xfs, etc. |
| `du -sh` | Show size of current directory | `120M .` |
| `du -sh /etc` | Show size of `/etc` directory | `27M /etc` |
| `dmidecode` | Hardware info (BIOS, memory, CPU) — root only | Detailed hardware specs |
| `lsblk` | List block devices (disks, partitions) | Shows disk tree |
| `lspci` | List PCI devices | Shows graphics, network cards |
| `lsusb` | List USB devices | Connected USB devices |

### Date and Time Commands

| Command | Description |
|---|---|
| `date` | Show current date and time |
| `date -s "22 Feb 2026 10:45:23"` | Set system date/time (root only) |
| `timedatectl` | Show and manage date/time settings |
| `timedatectl set-timezone Asia/Kolkata` | Set timezone |

### Calendar Commands

| Command | Description |
|---|---|
| `cal` | Show current month calendar |
| `cal 2026` | Show full year calendar |
| `cal 3` | Show previous, current, and next month |
| `cal -j` | Show Julian calendar (day-of-year) |
| `cal -j 2026` | Show Julian calendar for full year |

### Navigation Commands

| Command | Description |
|---|---|
| `pwd` | Print Working Directory (show current path) |
| `cd` | Go to home directory |
| `cd /path/to/dir` | Change to an absolute path |
| `cd ..` | Go one directory up (parent) |
| `cd ../..` | Go two directories up |
| `cd -` | Go to previous directory |
| `cd ~` | Go to home directory |

### Listing Commands

| Command | Description |
|---|---|
| `ls` | List files and directories |
| `ls -l` | Long listing (permissions, size, date) |
| `ll` | Same as `ls -l` (alias) |
| `ls -a` | Show all files including hidden (`.files`) |
| `ls -la` | Long list + hidden files |
| `ls -ltr` | Long list, sorted by time (oldest first) |
| `ls -lh` | Long list with human-readable file sizes |
| `ls -R` | Recursively list all subdirectories |
| `ls -d */` | List only directories |
| `ls -i` | Show inode numbers |

### Directory Commands

| Command | Description |
|---|---|
| `mkdir dirname` | Create a single directory |
| `mkdir a1 a2 a3` | Create multiple directories at once |
| `mkdir -p a1/b1/c1` | Create nested directories (including parents) |
| `mkdir "my folder"` | Create directory with a space in name |
| `rmdir dirname` | Remove an **empty** directory |
| `rm -rvf dirname` | Remove directory and all its contents (forcefully) |
| `tree` | Show directory structure in tree format |
| `tree -L 2` | Show tree up to 2 levels deep |

### File Commands

| Command | Description |
|---|---|
| `touch filename` | Create an empty file |
| `touch file1 file2 file3` | Create multiple files |
| `touch file{1..1000}` | Create 1000 files at once (brace expansion) |
| `cp source dest` | Copy file |
| `cp -r src_dir dest_dir` | Copy directory recursively |
| `mv source dest` | Move or rename a file/directory |
| `rm filename` | Delete a file |
| `rm -f filename` | Force delete (no confirmation) |
| `rm -rf dirname` | Delete directory and all contents |
| `ln file1 file2` | Create a hard link |
| `ln -s file1 softlink` | Create a soft link (symbolic link) |
| `file filename` | Show file type |

### Miscellaneous Useful Commands

| Command | Description |
|---|---|
| `clear` | Clear the terminal screen |
| `echo "text"` | Print text to terminal |
| `echo $VARIABLE` | Print value of a variable |
| `history` | Show command history |
| `history 20` | Show last 20 commands |
| `!number` | Re-run command number from history |
| `!!` | Re-run the last command |
| `which command` | Show full path of a command |
| `whereis command` | Show binary, source, and man page locations |
| `man command` | Show manual/help for a command |
| `info command` | Detailed info (more than man) |
| `command --help` | Quick help for a command |
| `exit` | Exit current shell session |
| `logout` | Log out of current session |
| `reboot` | Reboot the system |
| `shutdown now` | Shut down immediately |
| `shutdown +10` | Shut down after 10 minutes |
| `shutdown -c` | Cancel a scheduled shutdown |
| `su username` | Switch to another user |
| `su -` | Switch to root (with root's environment) |

---

## Chapter 7: File Creation Methods

In Linux, there are **4 main ways** to create files:

| Method | Tool | Best For |
|---|---|---|
| 1 | `touch` | Empty files; timestamp updates |
| 2 | `cat` | Quick text input from terminal |
| 3 | `nano` | Beginner-friendly text editor |
| 4 | `vim` | Professional, feature-rich editor |

### Method 1: `touch` — Create Empty File

```bash
touch filename              # create one empty file
touch ram sham siya         # create multiple files at once
touch file{1..100}          # create file1, file2, ... file100
touch file{a..z}            # create filea, fileb, ... filez
touch -t 202601011200 file  # create file with specific timestamp
```

> `touch` also **updates the timestamp** of an existing file without modifying its content.

### Method 2: `cat` — Create & Write Files

`cat` (concatenate) has three main uses:
1. **Create** a file with content
2. **Display** file contents
3. **Concatenate** (combine) multiple files

```bash
cat > filename              # create new file (Ctrl+D to save)
cat >> filename             # append to existing file
cat filename                # read/display file contents
cat file1 file2 > combined  # combine two files into one
```

### Redirectors — Very Important Concept

Redirectors control where command output goes:

| Redirector | Type | Behavior |
|---|---|---|
| `>` | Single (stdout) | **Override** — replaces existing content |
| `>>` | Double (stdout) | **Append** — adds to existing content |
| `2>` | stderr | Override — stores **error messages only** |
| `2>>` | stderr | Append — stores error messages |
| `&>` | Both | Override — stores **both output and errors** |
| `&>>` | Both | Append — stores both output and errors |

```bash
echo "Hello" > file.txt         # create/overwrite file with text
echo "World" >> file.txt        # append to file
ls /fakepath 2> errors.txt      # save error message to file
ls /home &> all.txt             # save all output (stdout + stderr) to file
```

### Method 3: `nano` — Beginner-Friendly Editor

`nano` is simple and shows commands at the bottom of the screen.

```bash
nano filename               # open or create file
```

Key shortcuts in nano:

| Shortcut | Action |
|---|---|
| `Ctrl + O` | Save file |
| `Ctrl + X` | Exit |
| `Ctrl + K` | Cut line |
| `Ctrl + U` | Paste |
| `Ctrl + W` | Search |
| `Ctrl + G` | Help |

### Method 4: `vim` — Professional Editor

See full details in Chapter 8.

---

## Chapter 8: Vim Editor (Complete Guide)

`vim` (Vi IMproved) is the most powerful and widely used text editor in Linux. It is modal — meaning different keys do different things depending on which **mode** you are in.

### The 4 Modes of Vim

```
                  ┌─────────────────┐
                  │   Command Mode  │  ← DEFAULT when opening
                  │   (Navigation)  │
                  └────────┬────────┘
              i/a/o/s/r/R  │  Esc
                  ┌────────▼────────┐
                  │   Insert Mode   │  ← For typing text
                  └─────────────────┘
                            │
                           Esc + :
                  ┌─────────▼───────┐
                  │  Ex/Command-line│  ← :w :q :wq :q!
                  │     Mode        │
                  └─────────────────┘
                  
                  V (from Command Mode)
                  ┌─────────────────┐
                  │   Visual Mode   │  ← For selecting text
                  └─────────────────┘
```

### Opening and Closing Vim

```bash
vim filename            # open or create a file
vi filename             # older version of vim
```

### Mode 1: Insert Mode — Typing Text

Enter from Command Mode by pressing one of these keys:

| Key | Action |
|---|---|
| `i` | Insert **before** cursor |
| `I` | Insert at **beginning of line** |
| `a` | Insert **after** cursor |
| `A` | Insert at **end of line** |
| `o` | Open **new line below** current line |
| `O` | Open **new line above** current line |
| `s` | Delete current character and enter insert mode |
| `S` | Delete entire line and enter insert mode |
| `r` | Replace single character (stays in command mode) |
| `R` | Replace mode — overwrite characters until `Esc` |

Press `Esc` to return to Command Mode.

### Mode 2: Command Mode — Navigation & Editing

This is the default mode when you open vim. You cannot type text here — these are commands:

**Cursor Movement:**

| Key | Movement |
|---|---|
| `h` | Move cursor **left** |
| `l` | Move cursor **right** |
| `j` | Move cursor **down** |
| `k` | Move cursor **up** |
| `0` | Go to beginning of line |
| `$` | Go to end of line |
| `gg` | Go to **first line** of file |
| `G` | Go to **last line** of file |
| `4gg` or `4G` | Go to **line 4** |
| `Ctrl + F` | Page forward (scroll down) |
| `Ctrl + B` | Page backward (scroll up) |
| `w` | Jump to next word |
| `b` | Jump to previous word |

**Cutting, Copying, Pasting:**

| Key | Action |
|---|---|
| `dd` | Delete (cut) **current line** |
| `4dd` | Delete (cut) **4 lines** from cursor |
| `dw` | Delete one word |
| `2dw` | Delete 2 words |
| `yy` | Copy (yank) current line |
| `2yy` | Copy 2 lines |
| `p` | Paste **below** cursor |
| `P` | Paste **above** cursor |
| `cc` | Cut entire line and enter insert mode |
| `cw` | Cut word and enter insert mode |
| `x` | Delete single character under cursor |

**Undo / Redo:**

| Key | Action |
|---|---|
| `u` | Undo last change |
| `Ctrl + R` | Redo (undo the undo) |

### Mode 3: Ex / Command-Line Mode — Save & Quit

Press `Esc` then `:` to enter this mode:

| Command | Action |
|---|---|
| `:w` | **Save** (write) file |
| `:q` | **Quit** vim |
| `:wq` | **Save and quit** |
| `:wq!` | Force save and quit |
| `:q!` | **Quit without saving** (force) |
| `:x` | Save if modified and quit |
| `ZZ` | Save and quit (shortcut, no colon needed) |

**Useful Ex Commands:**

| Command | Action |
|---|---|
| `:set nu` | Show line numbers |
| `:set nonu` | Hide line numbers |
| `:/word` | **Search** for a word (highlighted) |
| `:noh` | Remove search highlight |
| `:%s/old/new/g` | **Replace all** occurrences of 'old' with 'new' |
| `:%s/old/new/gc` | Replace all with **confirmation** |
| `:n` | Jump to line number n |
| `:!command` | Run a shell command from within vim |
| `:r filename` | Read and insert another file's contents |

### Mode 4: Visual Mode — Select Text

Press `v` or `V` from Command Mode:

| Key | Action |
|---|---|
| `v` | Visual mode — select character by character |
| `V` | Visual Line mode — select entire lines |
| `Ctrl + V` | Visual Block mode — select columns/rectangles |
| `d` | Delete selected text |
| `y` | Copy (yank) selected text |
| `p` | Paste after selection |
| `c` | Change (cut + insert mode) |
| `>` | Indent selected lines right |
| `<` | Indent selected lines left |

### Quick Vim Reference Card

```
Open:           vim file.txt
Enter insert:   i
Save:           Esc → :w → Enter
Quit:           Esc → :q → Enter
Save & Quit:    Esc → :wq → Enter
Force Quit:     Esc → :q! → Enter
Search:         Esc → /word → Enter → n (next)
Replace all:    Esc → :%s/old/new/g → Enter
Line numbers:   Esc → :set nu → Enter
```

---

## Chapter 9: File Read Operations

Linux provides multiple commands to read and view file contents, each with different behavior:

| Command | Description | Best For |
|---|---|---|
| `cat` | Display entire file at once | Small files |
| `less` | Display file page by page (navigate freely) | Large files (preferred) |
| `more` | Display file page by page (forward only) | Medium files |
| `head` | Show first N lines (default: 10) | Checking beginning |
| `tail` | Show last N lines (default: 10) | Checking end / logs |
| `tac` | Display file in reverse (last line first) | Reversed reading |
| `wc` | Count lines, words, and characters | File statistics |
| `strings` | Extract text from binary files | Binary analysis |

### Detailed Usage

```bash
# cat
cat filename               # display entire file
cat -n filename            # display with line numbers
cat -A filename            # show special characters (tabs, newlines)

# less (recommended for large files)
less filename              # open file in less
# Inside less: q=quit, /word=search, n=next result, G=end, gg=start

# more
more filename              # display with % progress shown
# Inside more: Space=next page, Enter=next line, q=quit

# head
head filename              # show first 10 lines
head -n 20 filename        # show first 20 lines
head -5 filename           # show first 5 lines

# tail
tail filename              # show last 10 lines
tail -n 20 filename        # show last 20 lines
tail -f /var/log/messages  # LIVE follow (new lines appear as written)
tail -f filename           # Monitor log files in real time — very useful!

# wc (word count)
wc filename                # lines words characters
wc -l filename             # count lines only
wc -w filename             # count words only
wc -c filename             # count characters/bytes
```

> **Pro Tip:** `tail -f /var/log/messages` is extremely useful for monitoring system logs in real time.

---

## Chapter 10: Linux Directory Structure

The Linux filesystem follows the **Filesystem Hierarchy Standard (FHS)**. Everything starts from `/` (root), which is the top-level directory.

```bash
[root@vbox /]# ls
afs  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
```

### The 19 Standard Directories

| # | Directory | Full Name / Purpose | Key Contents |
|---|---|---|---|
| 1 | `/` | Root — top-level directory | Everything |
| 2 | `/root` | Home directory of root user | Root's files |
| 3 | `/home` | Home directories for local users | `/home/username/` |
| 4 | `/bin` | User binaries | `ls`, `cat`, `cp`, `mv`, `rm` |
| 5 | `/sbin` | System binaries (root only) | `fdisk`, `useradd`, `shutdown` |
| 6 | `/etc` | Configuration files | `passwd`, `shadow`, `fstab`, `hostname` |
| 7 | `/var` | Variable data (changes often) | Logs, spool, cache |
| 8 | `/usr` | User programs and libraries | `/usr/bin`, `/usr/lib` |
| 9 | `/tmp` | Temporary files (auto-cleared) | Session temp files |
| 10 | `/proc` | Virtual filesystem — process/kernel info | `/proc/cpuinfo`, `/proc/meminfo` |
| 11 | `/dev` | Device files | `/dev/sda`, `/dev/null`, `/dev/random` |
| 12 | `/boot` | Boot files — kernel and bootloader | `vmlinuz`, `grub` |
| 13 | `/sys` | System hardware/kernel info (virtual) | Device attributes |
| 14 | `/mnt` | Manual mount point | External devices (manual) |
| 15 | `/media` | Removable media mount point | USB, CD-ROM |
| 16 | `/srv` | Service data | Web server files |
| 17 | `/lib` | 32-bit shared libraries | Shared `.so` files |
| 18 | `/lib64` | 64-bit shared libraries | 64-bit `.so` files |
| 19 | `/opt` | Optional/third-party software | Custom installs |
| 20 | `/run` | Runtime data (since last boot) | PID files |

### Important Directory Details

**`/etc` — The Configuration Hub**
```bash
/etc/passwd          # User account information
/etc/shadow          # Encrypted passwords
/etc/group           # Group information
/etc/hostname        # System hostname
/etc/hosts           # Local DNS resolution
/etc/fstab           # Filesystem mount table
/etc/ssh/sshd_config # SSH server configuration
/etc/crontab         # System cron jobs
/etc/sudoers         # sudo permissions
```

**`/var` — Variable Data**
```bash
/var/log/            # All log files (messages, cron, httpd, etc.)
/var/spool/mail/     # User mail spools
/var/www/html/       # Web server files (httpd/Apache)
/var/lib/            # Application state data
```

**`/proc` — Process Virtual Filesystem**
```bash
cat /proc/cpuinfo    # CPU information
cat /proc/meminfo    # Memory (RAM) information
cat /proc/version    # Kernel version
ls /proc/            # Each number = PID of a running process
```

**`/dev` — Device Files**
```bash
/dev/sda             # First SATA/SCSI hard disk
/dev/sda1            # First partition on sda
/dev/sdb             # Second hard disk
/dev/null            # Discard all output sent here
/dev/zero            # Source of zeros (for wiping disks)
/dev/random          # Source of random data
```

---

## Chapter 11: User and Group Management

User and group management controls **who** can access the system, **what** they can do, and **which resources** they can use.

### Three Types of Linux Users

| Type | UID Range | Description | Login Shell |
|---|---|---|---|
| **Root User** | 0 | Superuser — full control | `/bin/bash` |
| **System User** | 1–999 | Service accounts (mysql, apache) | `/sbin/nologin` |
| **Local User** | 1000+ | Regular human users | `/bin/bash` |

### The `/etc/passwd` File — User Database

This file stores basic user information. It has **7 fields** separated by colons:

```
username:password:UID:GID:comment:home_dir:shell
```

**Example:**
```
root:x:0:0:root:/root:/bin/bash
pallavi:x:1001:1001:Pallavi Sharma:/home/pallavi:/bin/bash
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
```

| Field # | Name | Description |
|---|---|---|
| 1 | username | Login name |
| 2 | password | `x` = password stored in `/etc/shadow` |
| 3 | UID | User ID number |
| 4 | GID | Primary Group ID |
| 5 | comment | Full name or description |
| 6 | home directory | User's home folder path |
| 7 | login shell | Shell used at login (`/bin/bash` or `/sbin/nologin`) |

```bash
cat /etc/passwd             # view all users
getent passwd username      # get specific user entry
```

### User Management Commands

```bash
# Create user
useradd username                   # create user with defaults
useradd -u 1050 username           # specify UID
useradd -g groupname username      # specify primary group
useradd -c "Full Name" username    # add comment/full name
useradd -d /custom/home username   # custom home directory
useradd -s /bin/bash username      # specify login shell
useradd -m username                # create home directory (default behavior)
useradd -M username                # do NOT create home directory

# Set/change password
passwd username                    # set password for user
passwd                             # change your own password

# Modify user
usermod -u 1060 username           # change UID
usermod -g newgroup username       # change primary group
usermod -c "New Name" username     # change comment
usermod -d /new/home username      # change home directory
usermod -s /sbin/nologin username  # change shell (disable login)
usermod -l newname oldname         # rename user
usermod -aG groupname username     # add user to supplementary group

# Delete user
userdel username                   # delete user only (home dir remains)
userdel -r username                # delete user + home directory + mail

# Lock/Unlock user
usermod -L username                # lock user (cannot login)
usermod -U username                # unlock user

# Check user info
id username                        # show UID, GID, groups
finger username                    # detailed user info (if installed)
```

### The `/etc/shadow` File — Password Security

Stores encrypted passwords. Only root can read this file. It has **9 fields**:

```
username:hashed_password:lastchange:minage:maxage:warning:inactive:expire:reserved
```

| Field # | Name | Description |
|---|---|---|
| 1 | username | Login name |
| 2 | hashed password | Encrypted password (SHA-512) |
| 3 | last change | Days since 1 Jan 1970 when password last changed |
| 4 | min age | Minimum days before password can be changed |
| 5 | max age | Maximum days before password must be changed |
| 6 | warning | Days before expiry that user is warned |
| 7 | inactive | Days after expiry before account is disabled |
| 8 | expire | Account expiration date (days since 1 Jan 1970) |
| 9 | reserved | Reserved for future use |

### Password Aging with `chage`

```bash
chage -l username              # list password aging info
chage -m 2 username            # set min days before password change
chage -M 90 username           # set max days (password expires in 90 days)
chage -W 7 username            # warn user 7 days before expiry
chage -I 5 username            # disable account 5 days after password expiry
chage -E "2026-12-31" username # set account expiry date
chage -d 0 username            # force password change on next login
```

### Group Management

Groups allow multiple users to share permissions.

```bash
# View groups
cat /etc/group                 # list all groups
groups username                # show groups a user belongs to
id username                    # show UID, GID, and all groups

# Create/modify groups
groupadd groupname             # create a new group
groupmod -n newname oldname    # rename a group
groupdel groupname             # delete a group

# Manage group members
gpasswd -a username groupname  # add user to group
gpasswd -d username groupname  # remove user from group
usermod -aG groupname username # add user to supplementary group
```

### The `/etc/group` File Format

```
groupname:password:GID:members
```
```
wheel:x:10:akshada,pallavi
mentore:x:1002:mayur,sham,nikhil
```

### Five User Dependencies (Created When User is Added)

| Dependency | Location | Description |
|---|---|---|
| UID | `/etc/passwd` | Unique numeric user identifier |
| GID | `/etc/passwd`, `/etc/group` | Group identifier |
| Skeleton files | `/etc/skel/` | Default files copied to new home dir |
| Home directory | `/home/username/` | User's personal workspace |
| Mail spool | `/var/spool/mail/username` | User's mailbox |

```bash
ls /etc/skel/              # see skeleton files (copied to all new home dirs)
ls -a /home/username/      # see hidden files (.bashrc, .bash_profile, .bash_logout)
```

---

## Chapter 12: File Permissions

Permissions in Linux control **who** can do **what** with files and directories. This is one of Linux's most powerful security features.

### Understanding `ls -l` Output

```bash
$ ls -l
-rwxr-xr-- 2 pallavi devops 4096 Feb 23 10:00 script.sh
```

Breakdown of each part:

```
-  rwx  r-x  r--   2   pallavi  devops   4096  Feb23  script.sh
│   │    │    │    │      │        │        │      │       │
│   │    │    │    │      │        │        │      │       └─ filename
│   │    │    │    │      │        │        │      └─ date/time
│   │    │    │    │      │        │        └─ file size
│   │    │    │    │      │        └─ group owner
│   │    │    │    │      └─ file owner
│   │    │    │    └─ hard link count
│   │    │    └─ other users' permissions
│   │    └─ group owner's permissions
│   └─ file owner's permissions
└─ file type
```

### File Types

| Symbol | Type | Description |
|---|---|---|
| `-` | Regular file | Text, binary, scripts |
| `d` | Directory | Folder |
| `l` | Symbolic link | Shortcut/pointer to another file |
| `b` | Block device | Hard disk, USB (`/dev/sda`) |
| `c` | Character device | Terminal, keyboard |
| `s` | Socket | Network/IPC communication |
| `p` | Named pipe (FIFO) | Process-to-process communication |

### The Three Permission Sets

| Category | Symbol | Description |
|---|---|---|
| **Owner** (user) | `u` | The user who owns the file |
| **Group** | `g` | Users belonging to the file's group |
| **Others** | `o` | Everyone else |

### The Three Permission Types

| Permission | Symbol | Numeric | On File | On Directory |
|---|---|---|---|---|
| **Read** | `r` | 4 | View file contents | List directory contents (`ls`) |
| **Write** | `w` | 2 | Modify file | Create/delete files inside |
| **Execute** | `x` | 1 | Run as a program | Enter the directory (`cd`) |
| **No permission** | `-` | 0 | No access | No access |

### Default Permissions

| File Type | Symbolic | Numeric | Explanation |
|---|---|---|---|
| File | `-rw-r--r--` | 644 | Owner can read/write; group/others can only read |
| Directory | `drwxr-xr-x` | 755 | Owner full; group/others can read and enter |

### chmod — Changing Permissions

**Symbolic Notation:**

```bash
chmod u+x file         # add execute permission to owner
chmod g-w file         # remove write from group
chmod o+r file         # add read to others
chmod ugo+rwx file     # give all permissions to all
chmod a+x file         # a = all (ugo) — same as ugo
chmod u=rwx,g=rx,o=r file  # set exact permissions
chmod u+w,g=rx,o=wx file   # combine multiple changes
```

**Numeric Notation (Most Common in Practice):**

```
Permission = r(4) + w(2) + x(1)

7 = rwx (4+2+1)
6 = rw- (4+2+0)
5 = r-x (4+0+1)
4 = r-- (4+0+0)
3 = -wx (0+2+1)
2 = -w- (0+2+0)
1 = --x (0+0+1)
0 = --- (0+0+0)
```

```bash
chmod 755 file         # rwxr-xr-x (owner=7, group=5, others=5)
chmod 644 file         # rw-r--r--
chmod 777 file         # rwxrwxrwx (full access to all — use with caution!)
chmod 600 file         # rw------- (private file, owner only)
chmod 700 dir          # rwx------ (private directory)
chmod -R 755 directory # apply recursively to entire directory
```

### chown — Changing Ownership

```bash
chown newowner file              # change file owner
chown newowner:newgroup file     # change owner and group
chown :newgroup file             # change only group
chgrp newgroup file              # change only group (alternative)

# Recursive ownership change
chown -R username:groupname /directory

# Examples
chown pallavi /var/www/html/     # give pallavi ownership of web root
chown root:devops /opt/project   # owner=root, group=devops
```

### umask — Default Permission Mask

`umask` defines which permissions are **removed** when new files/directories are created.

**Default umask:** `0022` (usually just `022`)

```
Full permission for file:       666
Minus umask:                  - 022
Resulting file permission:      644

Full permission for directory:  777
Minus umask:                  - 022
Resulting dir permission:       755
```

```bash
umask                  # show current umask
umask 027              # set umask (owner=full, group=read, others=nothing)
umask 077              # very strict — files: 600, dirs: 700
```

**umask Examples:**

| umask | File Permission | Directory Permission |
|---|---|---|
| 022 | 644 (rw-r--r--) | 755 (rwxr-xr-x) |
| 027 | 640 (rw-r-----) | 750 (rwxr-x---) |
| 077 | 600 (rw-------) | 700 (rwx------) |
| 033 | 633 (rw--wx-wx) | 744 (rwxr--r--) |

### Links — Hard Links and Soft Links

**Hard Link:**

A hard link is a **direct pointer to the same data** on disk. Both filenames refer to the same inode (data blocks).

```bash
ln original.txt hardlink.txt     # create hard link
ls -li                           # -i shows inode numbers (same for hard links)
```

| Property | Value |
|---|---|
| Inode | Same as original |
| Link count | Starts at 2 (increases with each new hard link) |
| If original deleted | Hard link still works (data safe) |
| Cross filesystem? | No |
| For directories? | No |

**Soft Link (Symbolic Link):**

A soft link is a **pointer to the filename/path** (like a Windows shortcut). If the original is deleted, the link breaks.

```bash
ln -s /path/to/original softlink  # create symbolic link
ls -l                             # shows: softlink -> /path/to/original
readlink softlink                 # show where link points
```

| Property | Value |
|---|---|
| Inode | Different from original |
| Link count | Always 1 |
| If original deleted | Broken link (dangling symlink) |
| Cross filesystem? | Yes |
| For directories? | Yes |

### Special Permissions

Beyond basic rwx, Linux has three special permissions:

**1. SUID (Set User ID) — `u+s`**

When a file with SUID is executed, it runs with the **file owner's** permissions (not the runner's). This allows regular users to run certain commands that need root access.

```bash
# Example: passwd command has SUID (regular users need it to change passwords)
ls -l /usr/bin/passwd
# -rwsr-xr-x. root root /usr/bin/passwd  ← the 's' in owner execute = SUID

chmod u+s /path/to/command    # apply SUID
chmod u-s /path/to/command    # remove SUID
chmod 4755 file               # numeric: 4 = SUID
```

> The `x` in owner permissions becomes `s` when SUID is set.

**2. SGID (Set Group ID) — `g+s`**

On a **file**: runs with the file's **group** permissions.
On a **directory**: new files created inside inherit the directory's **group**.

```bash
chmod g+s /project            # apply SGID on directory
chmod g-s /project            # remove SGID
chmod 2755 file               # numeric: 2 = SGID

# Example: all files created in /project will belong to 'mentore' group
chgrp mentore /project
chmod g+s /project
```

**3. Sticky Bit — `o+t`**

When set on a directory, **only the file owner, directory owner, or root** can delete files inside — even if others have write permission. Used on shared directories like `/tmp`.

```bash
chmod o+t /shared             # apply sticky bit
chmod o-t /shared             # remove sticky bit
chmod 1755 /shared            # numeric: 1 = sticky bit

ls -ld /tmp
# drwxrwxrwt — the 't' in others execute = sticky bit
```

### ACL — Access Control List

ACL provides **fine-grained permissions** beyond the standard owner/group/others model. Use it when you need to give a specific user or group access without changing the file's base ownership.

```bash
# Give user 'mayur' read-write-execute on /demo
setfacl -m u:mayur:rwx /demo

# Give group 'devops' read permission on /project
setfacl -m g:devops:r /project

# View ACL settings (+ sign in ls -l means ACL is set)
getfacl /demo

# Remove ACL for a specific user
setfacl -x u:mayur /demo

# Remove ALL ACL entries (including mask)
setfacl -b /demo

# Apply ACL recursively
setfacl -R -m u:mayur:rwx /demo
```

```
setfacl -m u:username:permissions /path    # set ACL for user
setfacl -m g:groupname:permissions /path   # set ACL for group
setfacl -x u:username /path                # remove ACL for one user
setfacl -b /path                           # remove all ACL
getfacl /path                              # view all ACL entries
```

---

## Chapter 13: sudo — Superuser Access

`sudo` (Superuser Do) allows a **regular user to temporarily execute commands with root privileges** — without switching to the root user. Every sudo action is logged.

### Why Use sudo Instead of Root Login?

- Logging — all sudo commands are recorded in `/var/log/secure`
- Safety — users only get elevated access when needed
- Auditability — know who ran what and when
- Security — root password is not shared with all admins

### The sudoers File

The `/etc/sudoers` file controls who can run what with sudo.

> **Important:** Always edit sudoers with `visudo` — it validates syntax before saving. A syntax error in sudoers can lock you out!

```bash
visudo                          # safe way to edit sudoers
# OR (less safe):
vim /etc/sudoers
```

**Sudoers file format:**
```
username  HOST=(USER:GROUP)  COMMANDS

# Examples:
root      ALL=(ALL)  ALL                    # root can run anything
akshada   ALL=(ALL)  ALL                    # akshada gets full sudo
pallavi   ALL=(ALL)  NOPASSWD: ALL          # no password prompt
mayur     ALL=(ALL)  /usr/sbin/useradd      # only allow useradd
```

### Common sudo Usage

```bash
sudo command                    # run command as root
sudo -u username command        # run as a specific user
sudo su                         # switch to root shell using sudo
sudo su - pallavi               # switch to pallavi using sudo
sudo !!                         # re-run previous command with sudo

# Practical examples:
sudo useradd newuser            # create user
sudo userdel -r username        # delete user
sudo systemctl restart httpd    # restart web server
sudo yum install vim            # install package
sudo dmidecode                  # view hardware info
```

### The `wheel` Group — Shortcut for sudo Access

Instead of editing sudoers for each user, add them to the `wheel` group. By default, all members of `wheel` have full sudo access.

```bash
# Add user to wheel group
usermod -aG wheel username

# Alternative using gpasswd
gpasswd -a username wheel

# Verify
groups username                 # should show 'wheel' in list
id username
```

```bash
# In /etc/sudoers, this line enables wheel group:
%wheel  ALL=(ALL)  ALL         # % means group
```

### Checking sudo Logs

```bash
cat /var/log/secure | grep sudo   # view all sudo activity
journalctl _COMM=sudo             # systemd log for sudo
```

---

## Chapter 14: Job Scheduling and Automation

Job scheduling allows commands or scripts to run **automatically at specified times** without manual intervention.

### Three Scheduling Tools in Linux

| Tool | Type | Use Case |
|---|---|---|
| `at` | One-time job | Run a command once in the future |
| `crontab` | Repeating jobs | Scheduled recurring tasks |
| `anacron` | Delayed recurring | Recurring tasks on systems not always on |

### A) `at` — One-Time Job Scheduling

`at` schedules a command to run **once** at a specific time. The `atd` daemon runs in the background to execute these jobs.

```bash
systemctl status atd           # check if atd is running
systemctl start atd            # start atd service
systemctl enable atd           # enable on boot
```

**Basic Usage:**
```bash
at 10:30                       # schedule for 10:30 today
at> touch /tmp/test.txt        # enter command
at> Ctrl+D                     # save and exit

at 10:30 AM                    # 12-hour format
at now + 2 minutes             # 2 minutes from now
at midnight                    # at midnight
at noon tomorrow               # noon tomorrow
at 9:30 PM 25 June 2026        # specific date and time
at 09:30 06/25/2026            # US date format
```

**Managing `at` Jobs:**
```bash
atq                            # list pending at jobs
at -l                          # same as atq
atrm 3                         # remove job number 3
at -c 3                        # show contents of job 3
```

### B) `crontab` — Recurring Job Scheduling

`crontab` (cron table) runs jobs **repeatedly on a schedule**. The `crond` daemon processes these.

**Crontab Syntax:**
```
MIN  HOUR  DAY  MONTH  WEEKDAY  COMMAND
 *    *     *     *       *     command_to_run
```

| Field | Range | Description |
|---|---|---|
| MIN | 0–59 | Minute |
| HOUR | 0–23 | Hour (0=midnight, 12=noon) |
| DAY | 1–31 | Day of month |
| MONTH | 1–12 | Month (1=Jan, 12=Dec) |
| WEEKDAY | 0–6 | Day of week (0=Sunday, 6=Saturday) |
| COMMAND | — | Command or script to execute |

**Special Characters:**
```
*       = every (any value)
*/2     = every 2 units (e.g., every 2 hours)
1-5     = range (Mon to Fri)
1,3,5   = list (Mon, Wed, Fri)
```

**Crontab Commands:**
```bash
crontab -e             # edit your crontab
crontab -l             # list your crontab entries
crontab -r             # remove all crontab entries
crontab -u username -l # view another user's crontab (root)
```

**Crontab Examples:**
```cron
# Run at 10:30 AM every day
30 10 * * * /home/user/backup.sh

# Run at midnight every Sunday
0 0 * * 0 /scripts/weekly_cleanup.sh

# Run every 5 minutes
*/5 * * * * /scripts/check_service.sh

# Run at 2:00 AM on the 1st of every month
0 2 1 * * /scripts/monthly_report.sh

# Run on weekdays (Mon-Fri) at 9 AM
0 9 * * 1-5 /scripts/weekday_task.sh

# Run every hour
0 * * * * /scripts/hourly_sync.sh

# Run every minute (useful for testing)
* * * * * echo "ping" >> /tmp/test.log
```

**Special Crontab Strings:**
```cron
@reboot     # run once at startup
@daily      # run once a day (same as: 0 0 * * *)
@weekly     # run once a week (same as: 0 0 * * 0)
@monthly    # run once a month (same as: 0 0 1 * *)
@hourly     # run once an hour (same as: 0 * * * *)
@yearly     # run once a year (same as: 0 0 1 1 *)
```

**System-wide Crontab:**
```bash
cat /etc/crontab         # system crontab (has USERNAME field)
ls /etc/cron.d/          # drop-in cron files
ls /etc/cron.daily/      # scripts that run daily
ls /etc/cron.weekly/     # scripts that run weekly
ls /etc/cron.monthly/    # scripts that run monthly
```

> **Practice tip:** Use https://crontab.guru to visually test crontab expressions.

### C) `anacron` — For Non-24×7 Systems

`anacron` is like cron but for systems that **aren't always running** (laptops, workstations). If a job is missed (machine was off), anacron runs it when the system next starts.

```bash
cat /etc/anacrontab        # view anacron configuration
```

---

## Chapter 15: Archive and Compression

### Archiving vs Compression

| Concept | Description |
|---|---|
| **Archiving** | Combining multiple files into one (no size reduction) |
| **Compression** | Reducing file size using algorithms |
| **Both** | Create a compressed archive (.tar.gz, .tar.bz2) |

### `tar` — Tape ARchive

`tar` is the standard Linux archiving tool.

**Common tar Options:**

| Option | Meaning |
|---|---|
| `-c` | **C**reate archive |
| `-x` | E**x**tract archive |
| `-t` | Lis**t** contents of archive |
| `-v` | **V**erbose (show files being processed) |
| `-f` | Specify archive **f**ilename |
| `-r` | Append files to archive |
| `-z` | Compress/decompress with **gzip** |
| `-j` | Compress/decompress with **bzip2** |
| `-J` | Compress/decompress with **xz** |
| `-C` | Extract to a specific directory |
| `-p` | Preserve permissions |

**Basic tar Commands:**
```bash
# Create archive
tar -cvf archive.tar /etc           # archive /etc directory

# List contents (without extracting)
tar -tvf archive.tar

# Extract archive
tar -xvf archive.tar                # extract here
tar -xvf archive.tar -C /mnt       # extract to /mnt

# Append files to existing archive
tar -rvf archive.tar /var
```

### Compression Methods

| Tool | Extension | Compression Speed | Compression Ratio | Decompress |
|---|---|---|---|---|
| `gzip` | `.tar.gz` or `.tgz` | Fast | Good | `gunzip` |
| `bzip2` | `.tar.bz2` | Medium | Better | `bunzip2` |
| `xz` | `.tar.xz` | Slow | Best | `unxz` |

**Create Compressed Archives:**
```bash
# gzip (most common, good balance)
tar -czvf backup.tar.gz /etc
tar -xzvf backup.tar.gz               # extract
tar -xzvf backup.tar.gz -C /restore   # extract to specific dir

# bzip2 (better compression)
tar -cjvf backup.tar.bz2 /etc
tar -xjvf backup.tar.bz2

# xz (best compression, slowest)
tar -cJvf backup.tar.xz /etc
tar -xJvf backup.tar.xz
```

**Compress Existing Files Separately:**
```bash
gzip file.tar       # creates file.tar.gz (removes original)
gunzip file.tar.gz  # decompress (removes .gz file)
gzip -k file        # keep original file

bzip2 file.tar      # creates file.tar.bz2
bunzip2 file.tar.bz2

xz file.tar         # creates file.tar.xz
unxz file.tar.xz
```

**Check File Sizes:**
```bash
du -sh /etc             # source: ~27M
du -sh backup.tar.gz    # ~5.1M after gzip
du -sh backup.tar.bz2   # ~4.2M after bzip2
du -sh backup.tar.xz    # ~3.3M after xz
```

**Other Archive Tools:**
```bash
zip archive.zip file1 file2    # create zip
unzip archive.zip              # extract zip
unzip -l archive.zip           # list contents

zcat file.gz                   # view compressed file without extracting
zless file.gz                  # view compressed file with less
```

---

## Chapter 16: Package Management

Package management is how Linux installs, updates, and removes software. Packages contain the program files, configuration files, and dependency information.

### Package Management Systems by Distro Family

| Family | Distros | Low-level Tool | High-level Tool |
|---|---|---|---|
| Red Hat | RHEL, CentOS, Fedora, AlmaLinux | RPM | YUM / DNF |
| Debian | Ubuntu, Debian, Kali, Mint | dpkg | apt / apt-get |
| SUSE | openSUSE, SLES | RPM | zypper |
| Arch | Arch Linux, Manjaro | — | pacman |

### 1. RPM — Red Hat Package Manager

RPM works with `.rpm` package files. It installs packages but **does NOT resolve dependencies automatically** — you must install dependencies manually.

```bash
rpm -qa                            # list ALL installed packages
rpm -qa | grep httpd               # search for specific package
rpm -q packagename                 # check if package is installed
rpm -qi packagename                # detailed info about installed package
rpm -ql packagename                # list all files from package
rpm -qd packagename                # list documentation files
rpm -qc packagename                # list configuration files
rpm -qf /path/to/file              # which package owns this file?
rpm -qR packagename                # list dependencies

# Install package
rpm -ivh package.rpm               # i=install, v=verbose, h=hash marks
rpm -Uvh package.rpm               # upgrade (install if not present)
rpm -Fvh package.rpm               # freshen (only upgrade if installed)

# Remove package
rpm -e packagename                 # uninstall package
rpm -ev --nodeps packagename       # remove ignoring dependencies

# Query before installing
rpm -qip package.rpm               # info about package (before install)
rpm -qlp package.rpm               # files in package (before install)
```

**Download a package using wget or curl:**
```bash
wget https://example.com/package.rpm
curl -O https://example.com/package.rpm
rpm -ivh package.rpm
```

### 2. YUM — Yellowdog Updater Modified

YUM (and its successor DNF) automatically resolves and installs dependencies. It connects to **online repositories** to find and download packages.

```bash
# Install
yum install httpd                  # install (prompts y/n)
yum install httpd -y               # install without confirmation
yum install httpd git vim -y       # install multiple packages

# Remove
yum remove httpd                   # remove package (keep dependencies)
yum autoremove httpd               # remove package + unused dependencies
yum erase httpd                    # same as remove

# Update
yum update                         # update all packages
yum update httpd                   # update specific package
yum check-update                   # check for available updates

# Search
yum search httpd                   # search for packages
yum info httpd                     # detailed package info
yum list installed                 # list all installed packages
yum list available                 # list available packages
yum list installed | grep httpd    # check specific package
yum provides /usr/bin/vim          # which package provides this file?

# History and rollback
yum history                        # show yum transaction history
yum history undo 5                 # undo transaction #5
yum history info 5                 # info about transaction

# Groups
yum grouplist                      # list package groups
yum groupinstall "Development Tools"  # install a group

# Download only (don't install)
yumdownloader packagename
```

### 3. DNF — Dandified YUM (Modern YUM)

DNF is the next-generation replacement for YUM (default in RHEL 8+, Fedora).

```bash
dnf install httpd -y
dnf remove httpd
dnf update
dnf search vim
dnf info httpd
dnf list installed
```

> Most `yum` commands work identically with `dnf`. In RHEL 8+, `yum` is an alias for `dnf`.

### 4. APT — Advanced Package Tool (Debian/Ubuntu)

```bash
apt update                         # refresh package list
apt upgrade                        # upgrade all packages
apt install vim -y                 # install package
apt remove vim                     # remove package (keep config)
apt purge vim                      # remove package + config files
apt autoremove                     # remove unused dependencies
apt search vim                     # search for packages
apt show vim                       # show package info
apt list --installed               # list installed packages
apt-cache depends vim              # show dependencies
```

### RPM vs YUM vs DNF Comparison

| Feature | RPM | YUM | DNF |
|---|---|---|---|
| Dependency resolution | Manual | Automatic | Automatic |
| Online repositories | No | Yes | Yes |
| Multiple packages | No | Yes | Yes |
| Rollback support | No | Yes | Yes |
| Speed | Fast | Moderate | Faster than YUM |
| Generation | 1st | 2nd | 3rd (current) |

### Common Services and Their Package Names

| Service | Package Name (RHEL) | Package Name (Ubuntu) |
|---|---|---|
| Web server | `httpd` | `apache2` |
| FTP server | `vsftpd` | `vsftpd` |
| SSH server | `openssh-server` | `openssh-server` |
| DNS server | `bind` | `bind9` |
| Firewall | `firewalld` | `ufw` |
| Database | `mariadb-server` | `mariadb-server` |
| Text editor | `vim` | `vim` |
| Network tools | `net-tools` | `net-tools` |

---

## Chapter 17: Disk Partitioning & LVM

### Storage Concepts

**Types of Storage:**

| Type | Full Name | Description |
|---|---|---|
| DAS | Direct Attached Storage | Directly connected (USB drive, internal HDD) |
| NAS | Network Attached Storage | Shared over LAN (NFS, Samba) |
| SAN | Storage Area Network | High-speed dedicated storage network (enterprise) |

**Block Device Naming:**
```
/dev/sda     # First SATA/SCSI disk
/dev/sda1    # First partition on first disk
/dev/sda2    # Second partition on first disk
/dev/sdb     # Second disk
/dev/nvme0n1 # First NVMe SSD
/dev/vda     # Virtual disk (KVM/VMware)
```

### Partition Types

Linux supports two partitioning schemes:

**MBR (Master Boot Record) — Legacy:**
- Max disk size: 2TB
- Max 4 primary partitions
- Can have 1 extended partition containing many logical partitions

**GPT (GUID Partition Table) — Modern:**
- Supports disks > 2TB
- Up to 128 partitions
- Better reliability (backup partition table)
- Required for UEFI booting

**Three Partition Types (MBR):**

| Type | Max Count | Can Boot? | Use |
|---|---|---|---|
| Primary | 4 | Yes | OS installation |
| Extended | 1 | No | Container for logical partitions |
| Logical | Many (inside extended) | No | Data storage |

### Disk Partitioning Commands

```bash
lsblk                      # show all block devices and partitions (tree view)
lsblk -f                   # show filesystems too
fdisk -l                   # list all disks and partitions (detailed)
blkid                      # show block device IDs and filesystem types
df -hT                     # show mounted filesystems and usage
parted -l                  # list partitions (GPT-aware)

# Create partitions with fdisk
fdisk /dev/sdb             # open interactive partition tool
# Inside fdisk:
# m  = help menu
# n  = new partition
# p  = primary partition
# e  = extended partition
# d  = delete partition
# l  = list partition types
# t  = change partition type
# w  = write changes (save)
# q  = quit without saving
```

### Filesystem Types

| Filesystem | Description | Common Use |
|---|---|---|
| ext4 | 4th extended filesystem | General purpose Linux (default) |
| xfs | High-performance 64-bit FS | RHEL 7+, large files, databases |
| btrfs | Copy-on-write FS | Advanced features (snapshots) |
| ntfs | Windows filesystem | Shared Windows/Linux disks |
| fat32 | Simple old filesystem | USB drives, boot partitions |

```bash
# Format (create filesystem on) a partition
mkfs.ext4 /dev/sdb1        # create ext4 filesystem
mkfs.xfs /dev/sdb2         # create xfs filesystem
mkfs.vfat /dev/sdb3        # create FAT32 filesystem

partprobe                   # inform kernel of partition table changes

# Mount and unmount
mount /dev/sdb1 /mnt        # mount partition to /mnt
umount /mnt                 # unmount
mount -t ext4 /dev/sdb1 /mnt  # mount with specific filesystem type
```

### Persistent Mounts — `/etc/fstab`

To automatically mount partitions at boot, add them to `/etc/fstab`:

```bash
cat /etc/fstab
```

Format:
```
DEVICE   MOUNT_POINT   FSTYPE   OPTIONS   DUMP   PASS
/dev/sdb1  /data       ext4     defaults  0      2
UUID=abc123 /backup    xfs      defaults  0      2
```

```bash
blkid /dev/sdb1            # get UUID of partition
mount -a                   # mount all entries in /etc/fstab
```

### Swap Space

Swap is disk space used as virtual RAM when physical RAM is full.

```bash
# Create swap partition
mkswap /dev/sdb3            # format as swap
swapon /dev/sdb3            # activate swap
swapoff /dev/sdb3           # deactivate swap
swapon -s                   # show active swap spaces
free -h                     # see RAM + swap

# Create swap file (alternative to swap partition)
dd if=/dev/zero of=/swapfile bs=1M count=2048   # 2GB swap file
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

### LVM — Logical Volume Manager

LVM is an advanced storage management system that allows **flexible, resizable volumes** regardless of physical disk boundaries.

**LVM Advantages:**
- Resize volumes without unmounting
- Merge multiple disks into one logical volume
- Create snapshots for backups
- Hot-add new disks

**LVM Layer Architecture:**
```
Physical Disks (/dev/sdb, /dev/sdc)
         ↓
Physical Volumes (PV) — pvcreate
         ↓
Volume Group (VG) — vgcreate
         ↓
Logical Volumes (LV) — lvcreate
         ↓
Filesystem (ext4, xfs) — mkfs
         ↓
Mount Point (/data)
```

**LVM Commands:**

```bash
# --- Physical Volumes ---
pvcreate /dev/sdb1 /dev/sdb2     # create physical volumes
pvs                               # list physical volumes (short)
pvdisplay                         # list physical volumes (detailed)
pvremove /dev/sdb1                # remove physical volume

# --- Volume Groups ---
vgcreate vg1 /dev/sdb1 /dev/sdb2 # create volume group
vgs                               # list volume groups
vgdisplay                         # detailed VG info
vgextend vg1 /dev/sdc1           # add new PV to VG
vgreduce vg1 /dev/sdb1           # remove PV from VG
vgremove vg1                      # delete volume group

# --- Logical Volumes ---
lvcreate -L 10G -n lv1 vg1       # create 10GB logical volume
lvcreate -l 100%FREE -n lv1 vg1  # use all available space
lvs                               # list logical volumes
lvdisplay                         # detailed LV info
lvextend -L +5G /dev/vg1/lv1     # increase size by 5GB
lvreduce -L -2G /dev/vg1/lv1     # decrease size by 2GB (careful!)
lvremove /dev/vg1/lv1            # delete logical volume

# --- Use the Logical Volume ---
mkfs.ext4 /dev/vg1/lv1           # create filesystem
mount /dev/vg1/lv1 /data         # mount it

# Resize filesystem after lvextend
resize2fs /dev/vg1/lv1           # for ext4
xfs_growfs /data                  # for xfs (must be mounted)

# Check usage
df -hT                            # see mounted volumes and usage
```

---

## Chapter 18: Networking Fundamentals

### What is a Network?

A **computer network** is a group of devices connected together to share resources and communicate. The internet is the world's largest network.

**ARPANET** (1969) — the first wide-area network, the predecessor of the modern internet.

### Network Interface Types

**Physical Interfaces:**
- **NIC** (Network Interface Card) — Ethernet (RJ-45) port, for wired connections
- **WNIC** (Wireless NIC) — Wi-Fi adapter for wireless connections

**Virtual/Logical Interfaces:**
- **lo** (loopback) — internal test interface, IP: `127.0.0.1`
- **VPN** — encrypted tunnel over the internet
- **NAT Gateway** — provides internet access to private networks

### Types of Networks by Coverage

| Type | Full Name | Range | Example |
|---|---|---|---|
| PAN | Personal Area Network | ~10m | Bluetooth headset, USB tethering |
| LAN | Local Area Network | Building/Campus | Office Wi-Fi, home router |
| MAN | Metropolitan Area Network | City | City-wide public Wi-Fi |
| WAN | Wide Area Network | Country/World | Internet, bank branch connections |

### Networking Commands

```bash
# Show network interfaces and IP addresses
ip a                           # modern way (shows all interfaces)
ip addr show                   # same as above
ifconfig                       # older command (may need net-tools package)
ifconfig enp0s3                # show specific interface

# Show routing table
ip route                       # show routing table
route -n                       # older way

# Test connectivity
ping 8.8.8.8                   # ping Google DNS (test internet)
ping -c 4 hostname             # ping 4 times only
ping6 ::1                      # ping IPv6 loopback

# DNS resolution
nslookup google.com            # DNS query
dig google.com                 # detailed DNS query
host google.com                # simple DNS lookup

# Show open ports and connections
ss -tlnp                       # show listening TCP ports (modern)
netstat -tlnp                  # older alternative (net-tools)
ss -a                          # show all connections

# Trace network path
traceroute google.com          # trace route to destination
tracepath google.com           # alternative (no root needed)

# Capture/analyze traffic
tcpdump                        # packet capture (requires root)
tcpdump -i enp0s3              # capture on specific interface

# Download files
wget https://example.com/file.tar.gz
curl -O https://example.com/file.tar.gz
curl -I https://example.com   # fetch headers only

# SSH and SCP
ssh user@192.168.1.100         # connect to remote host
scp file.txt user@host:/path/  # copy file to remote
```

### Network Configuration Files

```bash
/etc/hosts                    # local DNS (hostname to IP mapping)
/etc/resolv.conf              # DNS server settings
/etc/hostname                 # machine hostname
/etc/network/interfaces       # Debian network config
/etc/sysconfig/network-scripts/  # RHEL network scripts
```

---

## Chapter 19: OSI Model

The **OSI (Open Systems Interconnection) Model** is a conceptual framework that standardizes how different network systems communicate. It was developed by **ISO in 1984** and has **7 layers**.

### The 7 Layers (Remember: "All People Seem To Need Data Processing")

| # | Layer | Protocol/Examples | Simple Analogy |
|---|---|---|---|
| 7 | **Application** | HTTP, FTP, SMTP, DNS, SSH | Your app (browser, email) |
| 6 | **Presentation** | SSL/TLS, JPEG, MPEG, ASCII | Language translator |
| 5 | **Session** | NetBIOS, RPC, PPTP | Phone call connect/disconnect |
| 4 | **Transport** | TCP, UDP | Courier service |
| 3 | **Network** | IP, ICMP, ARP | Google Maps for data |
| 2 | **Data Link** | Ethernet, MAC, Wi-Fi | Vehicle number plate |
| 1 | **Physical** | Cables, Switches, Wi-Fi signals | The road for data |

### Layer Details

**Layer 7 — Application Layer**
Where the user interacts. Applications like browsers, email clients, and FTP clients live here. Protocols: HTTP, HTTPS, FTP, SMTP, DNS, SSH.

**Layer 6 — Presentation Layer**
Formats, encrypts, and compresses data so the receiver understands it. SSL/TLS encryption happens here. Think of it as a translator between different data formats.

**Layer 5 — Session Layer**
Establishes, manages, and terminates sessions (connections) between applications. Controls who talks when (dialogue control).

**Layer 4 — Transport Layer**
Ensures reliable end-to-end delivery. TCP = reliable (guaranteed delivery). UDP = fast but unreliable. Handles segmentation, flow control, and error recovery.

**Layer 3 — Network Layer**
Handles logical addressing (IP addresses) and routing — finding the best path to deliver data. Routers operate at this layer.

**Layer 2 — Data Link Layer**
Handles physical addressing (MAC addresses) and access to the physical medium. Switches and NICs operate here. Detects and corrects errors from the Physical layer.

**Layer 1 — Physical Layer**
Transmits raw bits (0s and 1s) over physical media — cables, fiber optic, radio waves. Defines voltage levels, data rates, and connectors.

### TCP/IP Model (Practical 4-Layer Model)

The TCP/IP model is what the internet actually uses:

| TCP/IP Layer | OSI Equivalent | Protocols |
|---|---|---|
| Application | Layers 5, 6, 7 | HTTP, FTP, DNS, SMTP, SSH |
| Transport | Layer 4 | TCP, UDP |
| Internet | Layer 3 | IP, ICMP, ARP |
| Network Access | Layers 1, 2 | Ethernet, Wi-Fi |

---

## Chapter 20: IP Addressing & Subnetting

### What is an IP Address?

An **IP (Internet Protocol) address** is a unique numerical label assigned to every device on a network. It enables devices to find and communicate with each other.

### IPv4 vs IPv6

| Feature | IPv4 | IPv6 |
|---|---|---|
| Bit length | 32 bits | 128 bits |
| Format | Dotted decimal: `192.168.1.1` | Hexadecimal: `2001:db8::1` |
| Total addresses | ~4.3 billion | 340 undecillion |
| NAT required? | Yes (addresses exhausted) | No |
| Example | `172.16.0.1` | `fe80::1` |

**MAC Address:** 48 bits — hardware address (unique per NIC)

### IPv4 Address Classes

| Class | First Octet Range | Format | Total Hosts | Use |
|---|---|---|---|---|
| A | 1–126 | N.H.H.H | ~16.7 million | Large organizations |
| B | 128–191 | N.N.H.H | ~65,536 | Medium organizations |
| C | 192–223 | N.N.N.H | 254 | Small networks |
| D | 224–239 | — | — | Multicast |
| E | 240–255 | — | — | Research/Reserved |

> **127.x.x.x** = Loopback (reserved; 127.0.0.1 = localhost)

### Private IP Ranges (Not Routable on Internet)

| Class | Private Range |
|---|---|
| A | 10.0.0.0 – 10.255.255.255 |
| B | 172.16.0.0 – 172.31.255.255 |
| C | 192.168.0.0 – 192.168.255.255 |

### Public IP vs Private IP

| Feature | Private IP | Public IP |
|---|---|---|
| Used in | LAN / internal network | Internet |
| Internet routable | No | Yes |
| Uniqueness | Unique within LAN only | Unique globally |
| Assigned by | Router / network admin | ISP |
| Cost | Free | Paid (via ISP) |

### TCP vs UDP

| Feature | TCP | UDP |
|---|---|---|
| Full Name | Transmission Control Protocol | User Datagram Protocol |
| Connection | Connection-oriented (3-way handshake) | Connectionless |
| Reliability | Guaranteed delivery, ordered | No guarantee, may arrive out of order |
| Speed | Slower (overhead for reliability) | Faster |
| Error Checking | Extensive | Basic checksum only |
| Use Cases | Web (HTTP/HTTPS), email, SSH | Streaming, DNS, VoIP, gaming |
| Handshake | SYN → SYN-ACK → ACK | None |

### CIDR — Classless Inter-Domain Routing

CIDR allows flexible subnetting beyond class boundaries. Written as `IP/prefix_length`.

```
192.168.1.0/24     # /24 = 24 network bits, 8 host bits
172.25.0.0/21      # /21 = 21 network bits, 11 host bits
10.0.0.0/8         # /8  = 8 network bits, 24 host bits
```

### Subnetting Calculation

**Example: 172.25.17.0/21**

```
Step 1: /21 means 21 bits on, 11 bits off
Binary:   11111111.11111111.11111000.00000000
Decimal:  255       255       248       0
Subnet:   255.255.248.0

Step 2: Total Hosts = 2^(off bits) = 2^11 = 2048
        Usable Hosts = 2048 - 2 = 2046

Step 3: Number of Networks = 2^(on bits in last group) = 2^5 = 32

Step 4: Magic Number = 256 - 248 = 8
        Network ranges: 0, 8, 16, 24, 32...
```

### Common Port Numbers

| Port | Protocol | Service |
|---|---|---|
| 22 | TCP | SSH |
| 23 | TCP | Telnet |
| 25 | TCP | SMTP (email sending) |
| 53 | UDP/TCP | DNS |
| 80 | TCP | HTTP |
| 110 | TCP | POP3 (email) |
| 143 | TCP | IMAP (email) |
| 443 | TCP | HTTPS |
| 3306 | TCP | MySQL |
| 5432 | TCP | PostgreSQL |
| 3389 | TCP | RDP (Windows Remote) |
| 8080 | TCP | HTTP alternate |
| 514 | UDP | Syslog |

---

## Chapter 21: Network Configuration (Practical)

### View Network Interfaces

```bash
ip a                           # show all interfaces with IPs
ip addr show enp0s3            # show specific interface
ifconfig                       # older command
```

### `nmtui` — Text-based Network Manager

`nmtui` (Network Manager Text User Interface) provides a menu-driven interface for network configuration.

```bash
nmtui                          # launch the TUI
```

Menu options:
- **Edit a connection** — configure IP, gateway, DNS
- **Activate a connection** — enable/disable a connection
- **Set system hostname** — change hostname

### Manual Network Configuration

```bash
# Set static IP using nmcli (command-line Network Manager)
nmcli con add type ethernet ifname enp0s3 con-name my-conn \
  ip4 172.25.0.4/24 gw4 172.25.0.1

nmcli con up my-conn           # activate connection
nmcli con show                 # list all connections
nmcli con down my-conn         # deactivate

# Temporary IP configuration (lost on reboot)
ip addr add 192.168.1.100/24 dev enp0s3
ip addr del 192.168.1.100/24 dev enp0s3
ip link set enp0s3 up          # bring interface up
ip link set enp0s3 down        # bring interface down
```

### Test Connectivity

```bash
ping 8.8.8.8               # test internet (Google DNS)
ping 172.25.0.4            # test another machine on LAN
ping -c 3 google.com       # ping 3 times only (stop automatically)
```

---

## Chapter 22: Firewall Management

### What is a Firewall?

A **firewall** is a network security system that monitors and controls incoming and outgoing network traffic based on security rules. It sits between your system/network and the outside world.

**Types:**
- **Software firewall** — runs on the OS (firewalld, iptables, ufw)
- **Hardware firewall** — physical device (Cisco ASA, FortiGate)

### firewalld — The Modern Linux Firewall

`firewalld` is the default firewall manager on RHEL/CentOS/Fedora. It uses **zones** to define trust levels.

```bash
# Check firewalld status
systemctl status firewalld
systemctl start firewalld
systemctl stop firewalld
systemctl enable firewalld     # auto-start on boot
systemctl disable firewalld
systemctl restart firewalld

rpm -qa | grep firewalld       # verify installation
```

### View Firewall Rules

```bash
firewall-cmd --list-all            # show all rules for default zone
firewall-cmd --list-services       # show allowed services
firewall-cmd --list-ports          # show allowed ports
firewall-cmd --get-default-zone    # show default zone
firewall-cmd --get-zones           # list all available zones
firewall-cmd --get-active-zones    # show active zones
```

### Allow/Block Ports and Services

```bash
# Allow a service (by name)
firewall-cmd --add-service=http --permanent
firewall-cmd --add-service=https --permanent
firewall-cmd --add-service=ssh --permanent
firewall-cmd --remove-service=http --permanent

# Allow a port (by number)
firewall-cmd --add-port=80/tcp --permanent
firewall-cmd --add-port=8080/tcp --permanent
firewall-cmd --add-port=443/tcp --permanent
firewall-cmd --remove-port=80/tcp --permanent

# Apply changes (reload firewall)
firewall-cmd --reload
```

> **Important:** Always use `--permanent` to make rules persist after reboot, then `--reload` to apply immediately.

### Port Forwarding

Redirect traffic from one port to another on the same machine:

```bash
# Forward port 80 to 8080
firewall-cmd --add-forward-port=port=80:proto=tcp:toport=8080 --permanent
firewall-cmd --reload
firewall-cmd --list-all    # verify

# Remove port forwarding rule
firewall-cmd --remove-forward-port=port=80:proto=tcp:toport=8080 --permanent
```

### IP Forwarding (Between Machines)

Forward traffic from one machine to another:

```bash
# Enable masquerade (needed for IP forwarding)
firewall-cmd --add-masquerade --permanent
firewall-cmd --reload

# Forward port 80 traffic to another IP
firewall-cmd --add-forward-port=port=80:proto=tcp:toaddr=172.25.0.6 --permanent
firewall-cmd --reload
```

### Web Server (httpd/Apache) Quick Setup

```
Service: httpd
Port: 80 (HTTP), 443 (HTTPS)
Config file: /etc/httpd/conf/httpd.conf
Web root: /var/www/html/
```

```bash
yum install httpd -y
vim /var/www/html/index.html       # create web page
systemctl start httpd
systemctl enable httpd
firewall-cmd --add-service=http --permanent
firewall-cmd --reload
curl localhost                     # test locally
curl 172.25.0.4                    # test from network
```

---

## Chapter 23: SSH — Secure Shell

### What is SSH?

**SSH (Secure Shell)** is a network protocol that provides **encrypted, secure remote access** to another computer. It replaces insecure protocols like Telnet, rlogin, and rsh.

| Property | Value |
|---|---|
| Port | 22 (default) |
| Protocol | TCP |
| Package | `openssh` |
| Service | `sshd` |
| Config file | `/etc/ssh/sshd_config` |

### SSH vs Telnet vs RDP

| Feature | SSH | Telnet | RDP |
|---|---|---|---|
| Encryption | Yes (strong) | No (plaintext) | Yes |
| OS | Linux/Unix/Mac | Any | Windows |
| Port | 22 | 23 | 3389 |
| Use | CLI remote access | CLI (insecure) | GUI remote desktop |

### SSH Installation and Setup

```bash
yum install openssh-server -y      # install SSH server
rpm -q openssh                     # verify installation
systemctl start sshd
systemctl enable sshd
systemctl status sshd

# Configure SSH
vim /etc/ssh/sshd_config
```

**Key sshd_config settings:**
```
Port 22                            # change port for security
PermitRootLogin no                 # disable direct root login
PasswordAuthentication yes         # enable password auth
PubkeyAuthentication yes           # enable key-based auth
MaxAuthTries 3                     # max login attempts
```

### Method 1: Password-Based Authentication

```bash
# Connect to remote machine
ssh username@IP_address
ssh pallavi@192.168.1.100

# Connect on non-default port
ssh -p 2222 username@IP_address

# Run a command remotely without interactive session
ssh username@IP_address "ls /home"

# Disconnect
exit
```

### Method 2: Key-Based Authentication (Recommended)

Key-based auth is more secure than passwords — used in **AWS EC2 and production servers**.

**How it works:**
```
Server has:  public key  (in ~/.ssh/authorized_keys)
Client has:  private key (in ~/.ssh/id_rsa or id_ed25519)
```

**Step-by-step setup:**

```bash
# Step 1: Generate key pair (on client machine)
ssh-keygen                         # generates RSA key (default)
ssh-keygen -t ed25519              # generate Ed25519 key (modern, recommended)
ssh-keygen -t rsa -b 4096          # generate 4096-bit RSA key

# Keys are stored in ~/.ssh/
ls ~/.ssh/
# id_ed25519       ← private key (KEEP SECRET)
# id_ed25519.pub   ← public key (share this)

# Step 2: Copy public key to server
ssh-copy-id username@server_ip     # automatic (recommended)
# OR manually:
cat ~/.ssh/id_ed25519.pub          # copy this content
ssh user@server
mkdir ~/.ssh && chmod 700 ~/.ssh
echo "PASTE_PUBLIC_KEY" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Step 3: Connect using key
ssh username@server_ip             # no password prompt!
ssh -i ~/.ssh/id_ed25519 username@server_ip  # specify key file
```

**Copy files securely with SCP:**
```bash
scp file.txt user@host:/path/dest/       # upload file
scp user@host:/path/file.txt /local/     # download file
scp -r /local/dir user@host:/remote/dir  # copy directory
scp -i key.pem file.txt user@host:/path/ # use specific key
```

**SSH Tunneling:**
```bash
# Local port forwarding (access remote service locally)
ssh -L 8080:localhost:80 user@server     # access server's port 80 via localhost:8080

# Dynamic SOCKS proxy
ssh -D 1080 user@server                  # use as SOCKS5 proxy
```

---

## Chapter 24: Log Management

### What are Log Files?

Log files record **events, processes, and activities** on your system. They are essential for:
- **Troubleshooting** — diagnose errors and failures
- **Monitoring** — track system health and performance
- **Security** — detect unauthorized access or attacks
- **Auditing** — maintain records of what happened and when

### Log Storage Location

```bash
/var/log/               # all log files are here
ls /var/log/
```

### Important Log Files

| Log File | Description |
|---|---|
| `/var/log/messages` | General system messages (most important) |
| `/var/log/secure` | Authentication and security events (SSH, sudo) |
| `/var/log/cron` | Cron job execution logs |
| `/var/log/boot.log` | System boot messages |
| `/var/log/dmesg` | Kernel ring buffer (hardware events) |
| `/var/log/httpd/access_log` | Apache web server access log |
| `/var/log/httpd/error_log` | Apache error log |
| `/var/log/audit/audit.log` | SELinux and audit logs |
| `/var/log/maillog` | Mail server logs |
| `/var/log/yum.log` | YUM package manager activity |

### Log Daemon: rsyslog

The **rsyslog** service collects and manages log files.

```bash
systemctl status rsyslog           # check if rsyslog is running
systemctl restart rsyslog
vim /etc/rsyslog.conf              # rsyslog configuration file
# Default port: 514 (UDP/TCP)
```

### Reading Logs

```bash
cat /var/log/messages              # read system messages
tail -f /var/log/messages          # live monitoring (real-time)
tail -n 50 /var/log/secure         # last 50 lines of secure log
grep "ERROR" /var/log/messages     # filter for errors only
grep "sshd" /var/log/secure        # filter for SSH events
```

### `journalctl` — Systemd Journal

`journalctl` is the modern way to view logs managed by **systemd-journald**:

```bash
journalctl                         # show all journal logs
journalctl -r                      # show in reverse (newest first)
journalctl -n 50                   # show last 50 log entries
journalctl -f                      # follow/live view (like tail -f)
journalctl -u httpd                # logs for specific service
journalctl -u sshd --since today   # SSH logs from today
journalctl --since "2026-01-01" --until "2026-06-01"  # date range
journalctl -p err                  # show only error messages
journalctl -p warning              # show warnings and above
journalctl _UID=1000               # logs from specific user ID

# Create a test log entry
logger "this is a test log message"
journalctl -r -n 5                 # verify it appeared
```

### Log Rotation

Log files grow over time and can fill up disk space. **Log rotation** automatically manages old log files by compressing, renaming, or deleting them.

**Log rotation service:** `logrotate`
**Config file:** `/etc/logrotate.conf`
**Drop-in configs:** `/etc/logrotate.d/`

```bash
cat /etc/logrotate.conf            # main config
ls /etc/logrotate.d/               # per-service config files
cat /etc/logrotate.d/httpd         # httpd log rotation config
```

**Create a custom log rotation config:**
```bash
vim /etc/logrotate.d/myapp

/var/log/myapp/*.log {
    daily                  # rotate daily (or weekly/monthly)
    missingok              # don't error if log file is missing
    rotate 7               # keep 7 rotated copies, then delete oldest
    compress               # compress old logs (.gz)
    delaycompress          # compress starting from 2nd rotation
    notifempty             # don't rotate if log is empty
    create 640 root adm    # create new empty log with permissions
    copytruncate           # copy and truncate (for apps that keep file open)
    postrotate
        systemctl reload httpd    # signal app to reopen log files
    endscript
}
```

```bash
# Test/force log rotation
logrotate -f /etc/logrotate.conf    # force rotate now (ignore schedule)
logrotate -d /etc/logrotate.conf    # dry run (test without actually rotating)
```

### Centralized Logging

In production environments, logs from all servers are sent to a **centralized log server** for easy monitoring.

```bash
# On log server: open rsyslog port 514 in firewall
firewall-cmd --add-port=514/udp --permanent
firewall-cmd --reload

# On log server: edit /etc/rsyslog.conf
# Uncomment: $ModLoad imudp
#            $UDPServerRun 514

# On client: add to /etc/rsyslog.conf
*.* @192.168.1.100:514         # send all logs to central server (UDP)
*.* @@192.168.1.100:514        # TCP (more reliable)

systemctl restart rsyslog
```

---

## Chapter 25: Process Management

### What is a Process?

A **process** is an instance of a running program. Every command you run creates a new process. Each process gets a unique **PID (Process ID)**.

```bash
cd /proc                           # each directory here = one process (PID)
ls /proc/                          # see all PIDs as numbers
```

### Viewing Processes

```bash
ps                                 # show processes of current shell
ps -ef                             # show ALL processes (full format)
ps -ef | more                      # paginated view
ps -aux                            # BSD format — more info (CPU%, MEM%)
ps -ef | grep httpd                # find specific process
ps -u username                     # processes by user
ps -u root | more                  # all root's processes
ps -g groupname                    # processes by group
```

**`ps` Output Fields:**

| Field | Meaning |
|---|---|
| PID | Process ID (unique) |
| PPID | Parent Process ID |
| TTY | Terminal the process is attached to |
| TIME | CPU time consumed |
| CMD | Command that started the process |
| %CPU | CPU usage percentage |
| %MEM | Memory usage percentage |
| STAT | Process state (R=running, S=sleeping, Z=zombie) |

### `top` and `htop` — Real-Time Process Monitor

```bash
top                                # real-time process monitor
```

**Inside `top`:**
- `q` — quit
- `k` — kill a process (enter PID)
- `u` — filter by user
- `M` — sort by memory
- `P` — sort by CPU
- `r` — change process priority (renice)
- `1` — show individual CPU cores

```bash
htop                               # enhanced version (install separately)
yum install htop -y
```

### Process States

| State | Symbol | Meaning |
|---|---|---|
| Running | R | Currently executing on CPU |
| Sleeping (interruptible) | S | Waiting for event (can be interrupted) |
| Sleeping (uninterruptible) | D | Waiting for I/O (cannot be interrupted) |
| Zombie | Z | Process finished but parent hasn't acknowledged |
| Stopped | T | Suspended (Ctrl+Z) |

### Killing Processes

```bash
kill -l                            # list all signals with numbers
kill PID                           # send SIGTERM (graceful) to process
kill -9 PID                        # send SIGKILL (force) to process
kill -15 PID                       # SIGTERM — graceful termination
kill -1 PID                        # SIGHUP — reload/restart process
kill -2 PID                        # SIGINT — interrupt (like Ctrl+C)

killall httpd                      # kill all processes named 'httpd'
pkill httpd                        # kill processes matching pattern
pkill -u username                  # kill all processes by user
```

**Common Kill Signals:**

| Signal | Number | Name | Meaning |
|---|---|---|---|
| SIGHUP | 1 | Hangup | Reload config / restart process |
| SIGINT | 2 | Interrupt | Ctrl+C — interrupt process |
| SIGKILL | 9 | Kill | **Force kill** — cannot be ignored |
| SIGTERM | 15 | Terminate | **Graceful shutdown** (default) |
| SIGSTOP | 19 | Stop | Pause process (like Ctrl+Z) |
| SIGCONT | 18 | Continue | Resume stopped process |

> **Best practice:** Always try `kill -15` first (graceful). Use `kill -9` only if the process won't stop.

### Foreground and Background Jobs

```bash
# Run command in background
sleep 300 &                        # & sends to background
command &                          # run any command in background

# Manage background jobs
jobs                               # list all current jobs (with job IDs)
bg %1                              # resume job 1 in background
fg %1                              # bring job 1 to foreground
fg %2                              # bring job 2 to foreground

# Suspend foreground job
Ctrl+Z                             # pause current foreground job

# Detach from terminal (keep running after logout)
nohup command &                    # run with nohup
disown %1                          # disown a job from shell
screen                             # terminal multiplexer (persistent sessions)
tmux                               # modern terminal multiplexer
```

### Process Priority (nice and renice)

Linux uses **nice values** to determine CPU priority. Range: -20 (highest priority) to +19 (lowest priority). Default nice value is 0.

```bash
nice -n 10 command                 # start command with lower priority (+10)
nice -n -5 command                 # start command with higher priority (needs root)
renice -n 5 -p PID                 # change priority of running process
renice -n 5 -u username            # change priority of all user's processes
```

### Useful Process Commands

```bash
pgrep httpd                        # get PID of process by name
pidof httpd                        # get PID (alternative)
lsof                               # list all open files
lsof -p PID                        # files opened by specific process
lsof -i :80                        # what's using port 80
fuser 80/tcp                       # which process is using port 80
strace -p PID                      # trace system calls of running process
```

---

## Chapter 26: Text Processing & Filters

Text processing is extremely powerful in Linux. These tools help you search, filter, transform, and analyze text data.

### `grep` — Search Text

`grep` (Global Regular Expression Print) searches for patterns in files or output.

```bash
grep "pattern" filename            # search in file
grep -i "pattern" filename         # case-insensitive
grep -n "pattern" filename         # show line numbers
grep -v "pattern" filename         # invert — show lines NOT matching
grep -r "pattern" /directory       # recursive search in directory
grep -l "pattern" /directory       # list files that contain pattern
grep -c "pattern" filename         # count matching lines
grep -A 3 "pattern" filename       # show 3 lines after match
grep -B 3 "pattern" filename       # show 3 lines before match

# With pipe
ps -ef | grep httpd                # filter process list
cat /etc/passwd | grep "bash"      # find users with bash shell
cat /var/log/messages | grep "error"  # find errors in log
```

### `awk` — Text Processing

`awk` is a powerful tool for processing structured text (like CSV or log files).

```bash
awk '{print $1}' file              # print first column
awk '{print $1, $3}' file          # print columns 1 and 3
awk -F: '{print $1}' /etc/passwd   # use : as delimiter, print usernames
awk '{print NR, $0}' file          # print line number before each line
awk 'NR==5' file                   # print only line 5
awk '/pattern/ {print}' file       # print lines matching pattern
awk '{sum += $1} END {print sum}' file  # sum first column

# Real examples
awk -F: '{print $1, $3}' /etc/passwd   # print username and UID
ps -ef | awk '{print $1, $2}'          # print user and PID from ps
```

### `sed` — Stream Editor

`sed` edits text non-interactively (perfect for scripts).

```bash
sed 's/old/new/' file              # replace first occurrence per line
sed 's/old/new/g' file             # replace all occurrences
sed 's/old/new/gi' file            # replace all (case-insensitive)
sed -i 's/old/new/g' file         # edit file IN PLACE
sed -i.bak 's/old/new/g' file     # edit in place, create backup .bak
sed -n '5p' file                   # print only line 5
sed -n '5,10p' file                # print lines 5 to 10
sed '5d' file                      # delete line 5
sed '/pattern/d' file              # delete lines matching pattern
sed '5a\New line text' file        # append text after line 5
sed '5i\New line text' file        # insert text before line 5

# Real examples
sed -i 's/root/admin/g' /etc/passwd            # change username in passwd
sed '/^#/d' /etc/rsyslog.conf                  # remove comment lines
sed 's/^[[:space:]]*//' file                   # remove leading whitespace
```

### `cut` — Extract Columns

```bash
cut -d: -f1 /etc/passwd            # extract field 1, delimiter ':'
cut -d: -f1,3 /etc/passwd          # extract fields 1 and 3
cut -c1-10 file                    # extract characters 1 to 10 per line
```

### `sort` — Sort Lines

```bash
sort filename                      # sort alphabetically
sort -r filename                   # sort in reverse
sort -n filename                   # sort numerically
sort -k 3 filename                 # sort by column 3
sort -u filename                   # sort + remove duplicates
sort -t: -k3 -n /etc/passwd        # sort passwd by UID (field 3, numeric)
```

### `uniq` — Remove Duplicates

```bash
sort file | uniq                   # remove duplicate lines (must sort first)
sort file | uniq -c                # count occurrences of each line
sort file | uniq -d                # show only duplicate lines
sort file | uniq -u                # show only unique lines
```

### `wc` — Word Count

```bash
wc file                            # lines words bytes
wc -l file                         # line count only
wc -w file                         # word count only
wc -c file                         # byte count only
ls | wc -l                         # count number of files in directory
```

### `find` — Find Files

```bash
find /path -name "filename"        # find by name
find / -name "*.conf"              # find all .conf files
find /home -user pallavi           # find files owned by pallavi
find /var -size +100M              # find files larger than 100MB
find /tmp -mtime +7                # files modified more than 7 days ago
find /etc -type f                  # find files only (not dirs)
find /etc -type d                  # find directories only
find / -perm 777                   # find files with 777 permissions
find / -name "*.log" -exec rm {} \; # find and delete all .log files

# With actions
find / -name "*.bak" -delete       # find and delete .bak files
find /home -name "*.txt" -exec chmod 644 {} \;
```

### `pipe (|)` — Chain Commands

The pipe `|` sends output of one command as input to the next:

```bash
ps -ef | grep httpd | wc -l        # count httpd processes
cat /etc/passwd | grep bash | cut -d: -f1  # list users with bash
ls -l | sort -k5 -rn               # list files sorted by size
history | grep apt                 # find past apt commands
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn  # top IPs
```

### `tee` — Split Output

```bash
command | tee output.txt           # print to screen AND save to file
command | tee -a output.txt        # same, but append to file
```

---

## Chapter 27: Shell Scripting Basics

Shell scripting automates repetitive tasks by combining Linux commands into executable scripts.

### What is a Shell Script?

A shell script is a text file containing a sequence of shell commands. When executed, the shell reads and runs each command in order.

### Creating Your First Script

```bash
vim hello.sh
```

```bash
#!/bin/bash
# This is a comment
# Script: hello.sh
# Purpose: Demonstrate basic shell scripting

echo "Hello, World!"
echo "Current user: $(whoami)"
echo "Current date: $(date)"
echo "Current directory: $(pwd)"
```

```bash
chmod +x hello.sh          # make it executable
./hello.sh                 # run the script
bash hello.sh              # alternative way to run
```

### The Shebang Line

`#!/bin/bash` (first line) tells the OS which interpreter to use:
```bash
#!/bin/bash            # use bash shell
#!/bin/sh             # use POSIX shell
#!/usr/bin/python3    # use Python 3
#!/usr/bin/env bash   # find bash in PATH (portable)
```

### Variables

```bash
#!/bin/bash

# Define variables (no spaces around =)
name="Pallavi"
age=25
city="Pune"

# Use variables with $
echo "Name: $name"
echo "Age: $age"
echo "City: $city"

# Command substitution
today=$(date)
files=$(ls | wc -l)
echo "Today: $today"
echo "Files in dir: $files"

# Read user input
read -p "Enter your name: " username
echo "Hello, $username!"
```

### Special Variables

| Variable | Meaning |
|---|---|
| `$0` | Script name |
| `$1`, `$2`, ... | Positional arguments |
| `$#` | Number of arguments |
| `$@` | All arguments |
| `$$` | PID of current script |
| `$?` | Exit status of last command (0=success) |
| `$USER` | Current username |
| `$HOME` | Home directory |
| `$PWD` | Current directory |
| `$PATH` | Executable search path |

### Conditional Statements

```bash
#!/bin/bash

num=10

# if / elif / else
if [ $num -gt 5 ]; then
    echo "$num is greater than 5"
elif [ $num -eq 5 ]; then
    echo "$num equals 5"
else
    echo "$num is less than 5"
fi

# Check if file exists
if [ -f "/etc/passwd" ]; then
    echo "File exists"
fi

# Check if directory exists
if [ -d "/home" ]; then
    echo "Directory exists"
fi

# String comparison
name="Linux"
if [ "$name" == "Linux" ]; then
    echo "Correct!"
fi
```

**Comparison Operators:**

| Operator | Numeric | String |
|---|---|---|
| Equal | `-eq` | `==` |
| Not equal | `-ne` | `!=` |
| Greater than | `-gt` | `>` |
| Less than | `-lt` | `<` |
| Greater or equal | `-ge` | — |
| Less or equal | `-le` | — |

**File Test Operators:**

| Operator | Meaning |
|---|---|
| `-f file` | File exists and is a regular file |
| `-d dir` | Directory exists |
| `-e path` | Path exists (any type) |
| `-r file` | File is readable |
| `-w file` | File is writable |
| `-x file` | File is executable |
| `-z string` | String is empty |
| `-n string` | String is not empty |

### Loops

```bash
#!/bin/bash

# for loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# for loop with range
for i in {1..10}; do
    echo "Counting: $i"
done

# for loop over files
for file in /etc/*.conf; do
    echo "Config file: $file"
done

# while loop
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done

# until loop (opposite of while)
x=1
until [ $x -gt 5 ]; do
    echo "x = $x"
    x=$((x + 1))
done
```

### Functions

```bash
#!/bin/bash

# Define a function
greet() {
    local person=$1       # local variable
    echo "Hello, $person!"
}

backup_files() {
    local source=$1
    local dest=$2
    tar -czvf "$dest/backup_$(date +%Y%m%d).tar.gz" "$source"
    echo "Backup complete!"
}

# Call functions
greet "Pallavi"
greet "World"
backup_files "/home" "/tmp"
```

### Practical Script Examples

**Script 1: Automated Backup**
```bash
#!/bin/bash
# Daily backup script

SOURCE="/home"
BACKUP_DIR="/backup"
DATE=$(date +%Y-%m-%d)
FILENAME="backup-$DATE.tar.gz"

mkdir -p $BACKUP_DIR
tar -czvf $BACKUP_DIR/$FILENAME $SOURCE

if [ $? -eq 0 ]; then
    echo "Backup successful: $FILENAME"
else
    echo "Backup FAILED!" >&2
    exit 1
fi
```

**Script 2: System Information**
```bash
#!/bin/bash
echo "===== System Information ====="
echo "Hostname:   $(hostname)"
echo "Date/Time:  $(date)"
echo "Kernel:     $(uname -r)"
echo "Uptime:     $(uptime -p)"
echo "CPU:        $(lscpu | grep 'Model name' | cut -d: -f2 | xargs)"
echo "Memory:     $(free -h | grep Mem | awk '{print $3"/"$2}')"
echo "Disk Usage: $(df -h / | awk 'NR==2 {print $3"/"$2" ("$5" used)"}')"
echo "Users:      $(who | wc -l) logged in"
```

**Script 3: User Creation Script**
```bash
#!/bin/bash
# Create multiple users from a list

USERLIST="users.txt"   # file with one username per line

if [ ! -f $USERLIST ]; then
    echo "User list file not found!"
    exit 1
fi

while read username; do
    if id "$username" &>/dev/null; then
        echo "User $username already exists"
    else
        useradd $username
        echo "password" | passwd --stdin $username
        echo "Created user: $username"
    fi
done < $USERLIST
```

---

## Quick Reference — Most Used Commands

### File & Directory

```bash
ls -la         # list all with details
pwd            # where am I?
cd /path       # go to directory
mkdir -p dir   # create directory (with parents)
cp -r src dst  # copy
mv src dst     # move/rename
rm -rf dir     # delete directory
find / -name   # search
```

### File Content

```bash
cat file       # view file
less file      # paginated view
head -20 file  # first 20 lines
tail -f file   # live view (logs)
grep "text" f  # search in file
wc -l file     # count lines
```

### System

```bash
uname -a       # system info
df -h          # disk usage
free -h        # RAM usage
ps -ef         # all processes
top            # live process monitor
kill -9 PID    # force kill
```

### Network

```bash
ip a           # IP addresses
ping host      # test connectivity
ss -tlnp       # open ports
ssh user@host  # remote access
```

### Permissions

```bash
chmod 755 file  # set permissions
chown user file # change owner
ls -l file      # view permissions
```

### Package Management (RHEL/CentOS)

```bash
yum install pkg    # install
yum remove pkg     # remove
yum update         # update all
rpm -qa | grep pkg # search installed
```

### Services

```bash
systemctl start httpd    # start service
systemctl stop httpd     # stop service
systemctl enable httpd   # auto-start at boot
systemctl status httpd   # check status
systemctl restart httpd  # restart
```

---

*End of Comprehensive Linux Notes*

> **Tip:** Practice these commands in a virtual machine (VirtualBox/VMware). Never practice destructive commands (`rm -rf`, `fdisk`, etc.) on a production server.

> **Resources for further learning:**
> - `man command` — built-in manual pages
> - https://linuxcommand.org — Linux command learning
> - https://crontab.guru — Crontab expression builder
> - https://explainshell.com — Understand complex shell commands
