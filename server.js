const express = require('express');
const app = express();
app.use(express.json());

// Kết nối với Google Sheets hoặc database
const { GoogleSpreadsheet } = require('google-spreadsheet');

// API lấy danh sách sản phẩm
app.get('/api/products', async (req, res) => {
    const doc = new GoogleSpreadsheet('YOUR_SHEET_ID');
    await doc.useServiceAccountAuth(require('./credentials.json'));
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    
    const products = rows.map(row => ({
        id: row['ID'],
        name: row['Tên sản phẩm'],
        quantity: row['Số lượng'],
        price: row['Giá']
    }));
    
    res.json(products);
});

app.listen(3000, () => console.log('Server running on port 3000'));
