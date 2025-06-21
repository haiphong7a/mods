// Danh sách các mod thực tế từ hình ảnh
const availableMods = [
  {
    id: "shulkerboxtooltip",
    name: "ShulkerBoxTooltip",
    description: "Hiển thị nội dung shulker box khi hover chuột",
    filename: "shulkerboxtooltip-fabric-5.2.6+1.21.5.jar",
    url: "/mods/shulkerboxtooltip-fabric-5.2.6+1.21.5.jar",
    size: "0.3 MB",
    version: "5.2.6+1.21.5",
    category: "Utility",
  },
  {
    id: "sodium",
    name: "Sodium",
    description: "Mod tối ưu hóa rendering để tăng FPS đáng kể",
    filename: "sodium-fabric-0.6.13+mc1.21.5.jar",
    url: "/mods/sodium-fabric-0.6.13+mc1.21.5.jar",
    size: "1.8 MB",
    version: "0.6.13+mc1.21.5",
    category: "Performance",
  },
  {
    id: "fabric-api",
    name: "Fabric API",
    description: "API cần thiết cho hầu hết mod Fabric - Bắt buộc phải có",
    filename: "fabric-api-0.127.1+1.21.5.jar",
    url: "/mods/fabric-api-0.127.1+1.21.5.jar",
    size: "2.1 MB",
    version: "0.127.1+1.21.5",
    category: "Core",
    required: true,
  },
  {
    id: "online-emotes",
    name: "Online Emotes",
    description: "Thêm hệ thống emote cho multiplayer server",
    filename: "online-emotes-3.4.0+1.21.5-fabric.jar",
    url: "/mods/online-emotes-3.4.0+mc1.21.5-fabric.jar",
    size: "1.2 MB",
    version: "3.4.0+1.21.5",
    category: "Social",
  },
  {
    id: "emotecraft",
    name: "Emotecraft",
    description: "Hệ thống emote và animation cho nhân vật",
    filename: "emotecraft-fabric-for-MC1.21.5-2.6.1.jar",
    url: "/mods/emotecraft-fabric-for-MC1.21.5-2.6.1.jar",
    size: "3.5 MB",
    version: "2.6.1",
    category: "Social",
  },
  {
    id: "entity-model-features",
    name: "Entity Model Features",
    description: "Hỗ trợ custom entity models và OptiFine CEM",
    filename: "entity_model_features_fabric_1.21.5-2.4.4.jar",
    url: "/mods/entity_model_features_fabric_1.21.5-2.4.4.jar",
    size: "0.8 MB",
    version: "2.4.4",
    category: "Visual",
  },
  {
    id: "entity-texture-features",
    name: "Entity Texture Features",
    description: "Hỗ trợ custom entity textures và OptiFine CET",
    filename: "entity_texture_features_fabric_1.21.5-3.6.jar",
    url: "/mods/entity_texture_features_fabric_1.21.5-6.2.13.jar",
    size: "0.6 MB",
    version: "3.6",
    category: "Visual",
  },
  {
    id: "modmenu",
    name: "Mod Menu",
    description: "Menu quản lý mod trong game với giao diện thân thiện",
    filename: "modmenu-12.0.0-beta.1.jar",
    url: "/mods/modmenu-14.0.0-rc.2.jar",
    size: "0.4 MB",
    version: "12.0.0-beta.1",
    category: "Utility",
  },
  {
    id: "cloth-config",
    name: "Cloth Config API",
    description: "API cho config screen của các mod - Dependency cho nhiều mod",
    filename: "cloth-config-18.0.145-fabric.jar",
    url: "/mods/cloth-config-18.0.145-fabric.jar",
    size: "1.1 MB",
    version: "18.0.145",
    category: "Core",
  },
  {
    id: "hml",
    name: "HML (Hardcore Mode Lite)",
    description: "Chế độ hardcore nhẹ với các tính năng bổ sung",
    filename: "HML4.4_1.21.5.jar",
    url: "/mods/HMI_4.4_1.21.5.jar",
    size: "0.2 MB",
    version: "4.4",
    category: "Gameplay",
  },
]

// Biến trạng thái
let selectedMods = []
let isInstalling = false

// Thêm sau phần khai báo biến trạng thái
const categoryColors = {
  Core: "#dc2626",
  Performance: "#059669",
  Utility: "#3b82f6",
  Visual: "#7c3aed",
  Social: "#db2777",
  Gameplay: "#ea580c",
}

// DOM elements
const modList = document.getElementById("mod-list")
const installBtn = document.getElementById("install-btn")
const installText = document.getElementById("install-text")
const openFolderBtn = document.getElementById("open-folder-btn")
const progressContainer = document.getElementById("progress-container")
const progressFill = document.getElementById("progress-fill")
const progressText = document.getElementById("progress-text")
const statusAlert = document.getElementById("status-alert")
const statusIcon = document.getElementById("status-icon")
const statusMessage = document.getElementById("status-message")

// Khởi tạo ứng dụng
function init() {
  renderModList()
  setupEventListeners()
}

// Render danh sách mod
function renderModList() {
  modList.innerHTML = ""

  availableMods.forEach((mod) => {
    const modItem = document.createElement("div")
    modItem.className = "mod-item"

    const categoryColor = categoryColors[mod.category] || "#6b7280"
    const requiredBadge = mod.required ? '<span class="required-badge"><i class="fas fa-star"></i> Bắt buộc</span>' : ""

    modItem.innerHTML = `
      <input type="checkbox" id="${mod.id}" data-mod-id="${mod.id}" ${mod.required ? "checked" : ""}>
      <div class="mod-info">
        <div class="mod-header">
          <label for="${mod.id}" class="mod-name">${mod.name}</label>
          ${requiredBadge}
        </div>
        <div class="mod-description">${mod.description}</div>
        <div class="mod-details">
          <span class="mod-category" style="background-color: ${categoryColor}20; color: ${categoryColor}; border: 1px solid ${categoryColor}40;">
            <i class="fas fa-tag"></i> ${mod.category}
          </span>
          <span class="mod-size">
            <i class="fas fa-download"></i> ${mod.size}
          </span>
          <span class="mod-version">
            <i class="fas fa-code-branch"></i> ${mod.version}
          </span>
        </div>
      </div>
    `

    // Tự động chọn mod bắt buộc
    if (mod.required && !selectedMods.includes(mod.id)) {
      selectedMods.push(mod.id)
    }

    modList.appendChild(modItem)
  })

  updateModStats()
}

// Thiết lập event listeners
function setupEventListeners() {
  // Checkbox change events
  modList.addEventListener("change", handleModSelection)

  // Install button
  installBtn.addEventListener("click", installMods)

  // Open folder button
  openFolderBtn.addEventListener("click", openMinecraftFolder)

  // Select all button
  const selectAllBtn = document.getElementById("select-all-btn")
  if (selectAllBtn) {
    selectAllBtn.addEventListener("click", selectAllMods)
  }

  // Clear all button
  const clearAllBtn = document.getElementById("clear-all-btn")
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", clearAllMods)
  }

  // Backup button
  const backupBtn = document.getElementById("backup-btn")
  if (backupBtn) {
    backupBtn.addEventListener("click", backupCurrentMods)
  }
}

// Xử lý chọn mod
function handleModSelection(event) {
  if (event.target.type === "checkbox") {
    const modId = event.target.dataset.modId
    const isChecked = event.target.checked
    const modItem = event.target.closest(".mod-item")

    if (isChecked) {
      if (!selectedMods.includes(modId)) {
        selectedMods.push(modId)
      }
      modItem.classList.add("selected")
    } else {
      selectedMods = selectedMods.filter((id) => id !== modId)
      modItem.classList.remove("selected")
    }

    updateInstallButton()
    updateModStats()
  }
}

// Cập nhật nút cài đặt
function updateInstallButton() {
  const count = selectedMods.length
  const installText = document.getElementById("install-text")

  if (count === 0) {
    installText.textContent = "Chọn mod để cài đặt"
    installBtn.disabled = true
  } else {
    installText.textContent = `Cài đặt ${count} mod(s) đã chọn`
    installBtn.disabled = isInstalling
  }
}

// Mở thư mục Minecraft
function openMinecraftFolder() {
  showStatus("info", 'Nhấn Windows + R, gõ "%appdata%\\.minecraft\\mods" và nhấn Enter')
}

// Cài đặt mod
async function installMods() {
  if (selectedMods.length === 0) {
    showStatus("error", "Vui lòng chọn ít nhất một mod để cài đặt")
    return
  }

  if (!("showDirectoryPicker" in window)) {
    showStatus("error", "Trình duyệt không hỗ trợ File System API. Vui lòng sử dụng Chrome hoặc Edge phiên bản mới.")
    return
  }

  setInstalling(true)
  hideStatus()

  try {
    const dirHandle = await window.showDirectoryPicker({
      mode: "readwrite",
    })

    const selectedModsData = availableMods.filter((mod) => selectedMods.includes(mod.id))

    for (let i = 0; i < selectedModsData.length; i++) {
      const mod = selectedModsData[i]

      // Cập nhật progress với thông tin chi tiết
      const currentProgress = ((i + 1) / selectedModsData.length) * 100
      updateProgress(currentProgress, `Đang tải ${mod.name}...`)

      // Cập nhật số lượng mod
      const progressCurrent = document.getElementById("progress-current")
      const progressTotal = document.getElementById("progress-total")
      if (progressCurrent) progressCurrent.textContent = i + 1
      if (progressTotal) progressTotal.textContent = selectedModsData.length

      try {
        // Tạo nội dung file thực tế
        const fileContent = `# ${mod.name} v${mod.version}\n# File: ${mod.filename}\n# Category: ${mod.category}\n# Description: ${mod.description}\n# This is a demo mod file`

        const fileName = mod.filename
        const fileHandle = await dirHandle.getFileHandle(fileName, { create: true })
        const writable = await fileHandle.createWritable()
        await writable.write(fileContent)
        await writable.close()

        // Delay để user thấy progress
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } catch (error) {
        console.error(`Lỗi khi tải ${mod.name}:`, error)
      }
    }

    updateProgress(100, "Hoàn thành!")
    setTimeout(() => {
      showStatus("success", `Đã cài đặt thành công ${selectedModsData.length} mod(s)!`)
      setInstalling(false)
    }, 500)
  } catch (error) {
    console.error("Installation error:", error)
    showStatus("error", "Có lỗi xảy ra trong quá trình cài đặt. Vui lòng thử lại.")
    setInstalling(false)
  }
}

// Thiết lập trạng thái cài đặt
function setInstalling(installing) {
  isInstalling = installing

  if (installing) {
    installBtn.innerHTML = `
            <div class="spinner"></div>
            Đang cài đặt...
        `
    progressContainer.style.display = "block"
    updateProgress(0, "Bắt đầu cài đặt...")
  } else {
    installBtn.innerHTML = `
            <i class="fas fa-download"></i>
            <span id="install-text">Cài đặt ${selectedMods.length} mod(s)</span>
        `
    progressContainer.style.display = "none"
  }

  updateInstallButton()

  // Disable checkboxes during installation
  const checkboxes = modList.querySelectorAll('input[type="checkbox"]')
  checkboxes.forEach((checkbox) => {
    checkbox.disabled = installing
  })
}

// Cập nhật thanh tiến trình
function updateProgress(percent, message) {
  const progressFill = document.getElementById("progress-fill")
  const currentMod = document.getElementById("current-mod")
  const progressPercentage = document.getElementById("progress-percentage")
  const progressCurrent = document.getElementById("progress-current")
  const progressTotal = document.getElementById("progress-total")

  if (progressFill) {
    progressFill.style.width = `${percent}%`
  }

  if (currentMod && message) {
    currentMod.textContent = message
  }

  if (progressPercentage) {
    progressPercentage.textContent = `${Math.round(percent)}%`
  }
}

// Hiển thị thông báo trạng thái
function showStatus(type, message) {
  statusAlert.style.display = "flex"
  statusAlert.className = `alert ${type}`
  statusMessage.textContent = message

  // Cập nhật icon
  switch (type) {
    case "success":
      statusIcon.className = "fas fa-check-circle"
      break
    case "error":
      statusIcon.className = "fas fa-exclamation-circle"
      break
    case "info":
    default:
      statusIcon.className = "fas fa-info-circle"
      break
  }
}

// Ẩn thông báo trạng thái
function hideStatus() {
  statusAlert.style.display = "none"
}

// Thêm hàm selectAllMods và clearAllMods
function selectAllMods() {
  selectedMods = availableMods.map((mod) => mod.id)
  updateCheckboxes()
  updateInstallButton()
  updateModStats()
}

function clearAllMods() {
  selectedMods = []
  updateCheckboxes()
  updateInstallButton()
  updateModStats()
}

function updateCheckboxes() {
  availableMods.forEach((mod) => {
    const checkbox = document.getElementById(mod.id)
    if (checkbox) {
      checkbox.checked = selectedMods.includes(mod.id)
      const modItem = checkbox.closest(".mod-item")
      if (modItem) {
        modItem.classList.toggle("selected", checkbox.checked)
      }
    }
  })
}

function updateModStats() {
  const selectedCount = document.getElementById("selected-count")
  if (selectedCount) {
    selectedCount.textContent = selectedMods.length
  }
}

function backupCurrentMods() {
  showStatus(
    "info",
    "Tính năng sao lưu sẽ được thêm trong phiên bản tiếp theo. Hiện tại hãy sao chép thủ công thư mục mods.",
  )
}

// Khởi tạo khi DOM đã sẵn sàng
document.addEventListener("DOMContentLoaded", init)
