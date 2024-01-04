document.addEventListener("DOMContentLoaded", function () {
  const dynamicContent15 = document.getElementById("dynamic-content-15");
  const addInput15Btn = document.getElementById("addInput15");
  const removeInput15Btn = document.getElementById("removeInput15");
  let inputCounter15 = 0;

  const dynamicContent1Tiet = document.getElementById("dynamic-content-1Tiet");
  const addInput1TietBtn = document.getElementById("addInput1Tiet");
  const removeInput1TietBtn = document.getElementById("removeInput1Tiet");
  let inputCounter1Tiet = 0;

  const maxInputs = 6; // tối đa

  //mặc định có 3 ô 15 phút và 2 ô 1 tiết
  addInput15();
  addInput15();
  addInput15();
  addInput1Tiet();
  addInput1Tiet();

  function addInput15() {
    if (inputCounter15 < maxInputs) {
      inputCounter15++;
      const inputDiv = document.createElement("div");
      inputDiv.classList.add("col-md-4");
      inputDiv.innerHTML = `
                            <div class="mb-3">
                                <label class="form-label">Kiểm tra 15 phút</label>
                                <input type="number" class="form-control" placeholder="Nhập điểm 15 phút cột thứ ${inputCounter15}" />
                            </div>
                        `;
      dynamicContent15.appendChild(inputDiv);
    }
  }

  function removeInput15() {
    if (inputCounter15 > 1) {
      const lastInput = dynamicContent15.lastChild;
      dynamicContent15.removeChild(lastInput);
      inputCounter15--;
    }
  }

  function addInput1Tiet() {
    if (inputCounter1Tiet < maxInputs) {
      inputCounter1Tiet++;
      const inputDiv = document.createElement("div");
      inputDiv.classList.add("col-md-4");
      inputDiv.innerHTML = `
                            <div class="mb-3">
                                <label class="form-label">Kiểm tra 1 tiết</label>
                                <input type="number" class="form-control" placeholder="Nhập điểm 1 tiết cột thứ ${inputCounter1Tiet}" />
                            </div>
                        `;
      dynamicContent1Tiet.appendChild(inputDiv);
    }
  }

  function removeInput1Tiet() {
    if (inputCounter1Tiet > 1) {
      const lastInput = dynamicContent1Tiet.lastChild;
      dynamicContent1Tiet.removeChild(lastInput);
      inputCounter1Tiet--;
    }
  }

  addInput15Btn.addEventListener("click", addInput15);
  removeInput15Btn.addEventListener("click", removeInput15);
  addInput1TietBtn.addEventListener("click", addInput1Tiet);
  removeInput1TietBtn.addEventListener("click", removeInput1Tiet);

  // kiểm tra đầu vào
  function isValidInput(value) {
    return !isNaN(value) && value >= 0 && value <= 10;
  }

  //xử lý tính toán
  const calculateButton = document.getElementById("calculateButton");
  const resultDiv = document.getElementById("result");

  calculateButton.addEventListener("click", function () {
    // Lấy giá trị từ các input
    const diem15Phut = [];
    for (let i = 1; i <= inputCounter15; i++) {
      const input = document.querySelector(
        `#dynamic-content-15 input[placeholder="Nhập điểm 15 phút cột thứ ${i}"]`
      );
      const inputValue = parseFloat(input.value) || 0;

      if (!isValidInput(inputValue)) {
        alert("Vui lòng nhập giá trị hợp lệ (từ 0 đến 10)");
        return;
      }

      diem15Phut.push(inputValue);
    }

    const diem1Tiet = [];
    for (let i = 1; i <= inputCounter1Tiet; i++) {
      const input = document.querySelector(
        `#dynamic-content-1Tiet input[placeholder="Nhập điểm 1 tiết cột thứ ${i}"]`
      );
      const inputValue = parseFloat(input.value) || 0;

      if (!isValidInput(inputValue)) {
        alert("Vui lòng nhập giá trị hợp lệ (từ 0 đến 10)");
        return;
      }

      diem1Tiet.push(inputValue);
    }

    const diemHocKy =
      parseFloat(document.getElementById("thiHocKy").value) || 0;

    if (!isValidInput(diemHocKy)) {
      alert("Vui lòng nhập giá trị hợp lệ (từ 0 đến 10)");
      return;
    }

    // Thực hiện tính toán
    const tongDiem =
      diem15Phut.reduce((a, b) => a + b, 0) +
      diem1Tiet.reduce((a, b) => a + b * 2, 0) +
      diemHocKy * 3;
    const ketqua = tongDiem / 10;

    // Hiển thị kết quả
    resultDiv.textContent = `Tổng điểm: ${ketqua}đ`;

    const xepLoai = document.getElementById("xepLoai");

    if (ketqua < 3.5) {
      xepLoai.textContent = `Bạn ở mức Kém`;
    } else if (ketqua >= 3.5 && ketqua < 5.0) {
      xepLoai.textContent = `Bạn ở mức Yếu`;
    } else if (ketqua >= 5.0 && ketqua < 6.5) {
      xepLoai.textContent = `Bạn ở mức Trung Bình`;
    } else if (ketqua >= 6.5 && ketqua < 8.0) {
      xepLoai.textContent = `Bạn ở mức Khá`;
    } else if (ketqua >= 8.0 && ketqua < 9.0) {
      xepLoai.textContent = `Bạn ở mức Giỏi`;
    } else if (ketqua >= 9.0) {
      xepLoai.textContent = `Bạn quá Xuất sắc`;
    }
  });
});
