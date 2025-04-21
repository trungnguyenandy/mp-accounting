// Kết nối với Google Sheets API hoặc Backend riêng
const API_URL = "https://your-api-endpoint.com"; // Thay bằng API thực tế

// Load dữ liệu khi trang web mở
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
});

// Hiển thị danh sách sản phẩm
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        
        const tableBody = document.getElementById('productTable');
        tableBody.innerHTML = products.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td>${formatPrice(product.price)}</td>
                <td>
                    <button class="btn btn-sm btn-warning me-2">Sửa</button>
                    <button class="btn btn-sm btn-danger">Xóa</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
    }
}

// Thêm sản phẩm mới
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newProduct = {
        name: document.getElementById('productName').value,
        quantity: document.getElementById('productQty').value,
        price: document.getElementById('productPrice').value
    };

    try {
        await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });
        await loadProducts();
        e.target.reset();
    } catch (error) {
        alert("Lỗi khi thêm sản phẩm!");
    }
});

// Định dạng giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN').format(price) + '₫';
}
