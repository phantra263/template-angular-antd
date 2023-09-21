import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(private httpClient: HttpClient) { }

  fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  fileExtension = '.xlsx';

  templateName = {
    TongHopCong: 'TongHopNgayCongTemplate.xlsx',
    ChiTietNgayCongNVTheoThang: 'ChiTietNgayCongNVTheoThangTemplate.xlsx'
  }

  public exportExcel(jsonData: any[], fileName: string): void {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    this.saveExcelFile(excelBuffer, fileName);
  }

  private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
    FileSaver.saveAs(data, fileName + this.fileExtension);
  }

  public ThongTinNgayCongTrongThangByNhanVien(dataForExport: any, thongTinNhanVien: any, fileNameExport?: string,): void {
    let bgCuoiTuan: string = 'fff3cd';
    let bgNgayLe: string = '91d5ff';
    //let sumRowVbn: number = 0;

    // đọc file template export
    this.httpClient.get(`assets/ExcelTemplates/${this.templateName.ChiTietNgayCongNVTheoThang}`, { responseType: 'blob' })
      .subscribe((file: Blob) => {

        // xử lý file template sang obj Workbook 
        const workbook = new Workbook();
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = async (e) => {
          let arrayBuffer = fileReader.result as ArrayBuffer;

          if (arrayBuffer)
            await workbook.xlsx.load(arrayBuffer);

          // lấy ra sheet cần xử lý
          let worksheet = workbook.getWorksheet('Sheet1');

          // gán tên, mã nhân viên và thời gian
          worksheet.getCell('B1').value = thongTinNhanVien.tenNhanVien;
          worksheet.getCell('B2').value = thongTinNhanVien.maNhanVien;
          worksheet.getCell('E2').value = `THÁNG: ${thongTinNhanVien.thoiGian}`;

          let defaultTotalCol = worksheet.columnCount; // tổng số cột ban đầu
          let defaultTotalRow = worksheet.rowCount + 1; // tổng số dòng ban đầu
          let rowNumber = worksheet.rowCount + 1; // tổng số dòng ban đầu (dòng insert dữ liệu mới = tổng dòng ban đầu + 1)

          var arrObjThdl = dataForExport.length > 0 ? Object.keys(dataForExport[0]) : []  // đọc các key của object TongHopNgayCong

          let sumRowVbn: number = 0
          // insert row data
          dataForExport.forEach((item: any) => {
            var colNumber = 1;

            var viecbenngoais = item['x_ViecBenNgoais']
            var vbenngoai = viecbenngoais ? Object.keys(viecbenngoais[0]) : []

            if (viecbenngoais) {  // trường hợp vbn != null
              // Xử lý merge cells
              if (viecbenngoais.length > 1) {
                for (var i = 1; i <= defaultTotalCol; i++) {
                  // khi đến vị trí của cột 'viecbenngoai' thì sẽ không merge
                  if (i <= arrObjThdl.indexOf('x_ViecBenNgoais')) {
                    worksheet.mergeCells(rowNumber, i, rowNumber + ((viecbenngoais.length == 1) ? 0 : viecbenngoais.length - 1), i)
                  }
                }
              }

              var curLoopRow = rowNumber
              for (var i = 0; i < viecbenngoais.length; i++) {
                arrObjThdl.forEach(key => {

                  if (key == 'x_ViecBenNgoais') {
                    var vbnTemp: any = viecbenngoais[i]

                    // lay ra so cot hien tai
                    var colCurNumber = colNumber  // new

                    vbenngoai.forEach((key, idx) => {
                      worksheet.getCell(curLoopRow, colCurNumber + idx).value = vbnTemp[key]
                      colNumber += 1 // new
                    })
                  } else {
                    // format date ở cột 'ngày'
                    if (key === 'a_Ngay') {
                      worksheet.getCell(curLoopRow, colNumber).value = item[key].split("T")[0]
                    } else {
                      // new
                      // truong hop key ko phai 'y_isCuoiTuan' vs 'z_isNgayLe' thi gan gia tri
                      if (key != 'y_isCuoiTuan' && key != 'z_isNgayLe') {
                        worksheet.getCell(curLoopRow, colNumber).value = item[key]
                      }
                    }
                    colNumber += 1
                  }
                })
                colNumber = 1;
                curLoopRow++;
              }
            } else {  // trường hợp vbn = null
              arrObjThdl.forEach(key => {
                if (key === 'a_Ngay') {
                  worksheet.getCell(rowNumber, colNumber).value = item[key].split("T")[0]
                } else {
                  // new
                  // truong hop key ko phai 'y_isCuoiTuan' vs 'z_isNgayLe' thi gan gia tri
                  if (key != 'y_isCuoiTuan' && key != 'z_isNgayLe') {
                    worksheet.getCell(rowNumber, colNumber).value = item[key]
                  }
                }
                colNumber += 1
              })
            }

            rowNumber += (viecbenngoais ? (viecbenngoais.length) : 1);

            // new
            // set background cho ngay cuoi tuan & ngay le
            sumRowVbn += (item['x_ViecBenNgoais'] && item['x_ViecBenNgoais'].length) > 1 ? item['x_ViecBenNgoais'].length : 1 // cong don so luong item trong danh sach vbn
            var curRowVbn = (item['x_ViecBenNgoais'] && item['x_ViecBenNgoais'].length) > 1 ? item['x_ViecBenNgoais'].length : 1  // get so luong item trong danh sach vbn hien tai - doi tuong dang dc loop

            // truong hop ngay cuoi tuan
            if (item['y_isCuoiTuan'] && !item['z_isNgayLe']) {
              // xu ly to mau background theo so dong tuong ung voi so luong item vbn cua doi tuong hien tai
              for (var i = 1; i <= curRowVbn; i++) {
                for (var j = 1; j <= worksheet.columnCount; j++) {
                  worksheet.getCell(defaultTotalRow + sumRowVbn - i, j).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: bgCuoiTuan }
                  };
                }
              }
            }

            // truong hop ngay le
            if (item['z_isNgayLe']) {
              // console.log(defaultTotalRow + sumRowVbn - 1);
              // xu ly to mau background theo so dong tuong ung voi so luong item vbn cua doi tuong hien tai
              for (var i = 1; i <= curRowVbn; i++) {
                for (var j = 1; j <= worksheet.columnCount; j++) {
                  worksheet.getCell(defaultTotalRow + sumRowVbn - i, j).fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: bgNgayLe }
                  };
                }
              }
            }
          });

          /**
           * Format cell
          */
          for (var i = defaultTotalRow; i <= worksheet.rowCount; i++) {
            for (var j = 1; j <= worksheet.columnCount; j++) {

              // set alginment cell
              // worksheet.getCell(i, j).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
              worksheet.getCell(i, j).alignment = { vertical: 'middle', horizontal: 'center' };

              // set border cell
              worksheet.getCell(i, j).border = {
                top: { style: 'thin', color: { argb: '#000000' } },
                left: { style: 'thin', color: { argb: '#000000' } },
                bottom: { style: 'thin', color: { argb: '#000000' } },
                right: { style: 'thin', color: { argb: '#000000' } }
              };
            }
          }

          /**
           * Ghi file excel
           */
          await workbook.xlsx.writeBuffer().then((data: any) => {
            let blob = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            FileSaver.saveAs(blob, `${fileNameExport ?? 'exportData'}.xlsx`);
          });
        }
      })
  }

  public TongHopNgayCongTheoThang(dataForExport: any, thoiGian: string, fileNameExport?: string,): void {
    this.httpClient.get(`assets/ExcelTemplates/${this.templateName.TongHopCong}`, { responseType: 'blob' })
      .subscribe((file: Blob) => {

        // xử lý file template sang obj Workbook 
        const workbook = new Workbook();
        let fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        fileReader.onload = async (e) => {
          let arrayBuffer = fileReader.result as ArrayBuffer;

          if (arrayBuffer)
            await workbook.xlsx.load(arrayBuffer);

          // lấy ra sheet cần xử lý
          let worksheet = workbook.getWorksheet('Sheet1');

          // gán tên, mã nhân viên và thời gian
          worksheet.getCell('A2').value = `THÁNG: ${thoiGian}`

          let defaultTotalRow = worksheet.rowCount + 1; // tổng số dòng ban đầu

          dataForExport.forEach((item: any, idx: any) => {
            worksheet.getCell(defaultTotalRow + idx, 1).value = idx + 1;
            worksheet.getCell(defaultTotalRow + idx, 2).value = item['maNhanVien'];
            worksheet.getCell(defaultTotalRow + idx, 3).value = item['hoTenDem'];
            worksheet.getCell(defaultTotalRow + idx, 4).value = item['ten'];
            worksheet.getCell(defaultTotalRow + idx, 5).value = item['tenPhong'];
            worksheet.getCell(defaultTotalRow + idx, 6).value = item['soNgayCong'];
            worksheet.getCell(defaultTotalRow + idx, 7).value = item['soNgayNghiLe'];
            worksheet.getCell(defaultTotalRow + idx, 8).value = item['soPhutDiTre'];
            worksheet.getCell(defaultTotalRow + idx, 9).value = item['soPhutVeSom'];
            worksheet.getCell(defaultTotalRow + idx, 10).value = item['soGioViecBenNgoai'];
            worksheet.getCell(defaultTotalRow + idx, 11).value = item['soNgayNghiPhepHopLe'];
            worksheet.getCell(defaultTotalRow + idx, 12).value = item['soNgayNghiPhepKhongHopLe'];
            worksheet.getCell(defaultTotalRow + idx, 13).value = item['soNgayCongThucTe'];
            worksheet.getCell(defaultTotalRow + idx, 14).value = item['soNgayCongThieu'];
          })

          /**
           * Format cell
          */
          for (var i = defaultTotalRow; i <= worksheet.rowCount; i++) {
            for (var j = 1; j <= worksheet.columnCount; j++) {

              // set alginment cell
              worksheet.getCell(i, j).alignment = (j == 3 || j == 4) ? { vertical: 'middle', horizontal: 'left' } : { vertical: 'middle', horizontal: 'center' };

              worksheet.getCell(i, j).font = {
                name: 'Times New Roman',
                family: 2,
                size: 12
              };

              // set border cell
              worksheet.getCell(i, j).border = {
                top: { style: 'thin', color: { argb: '#000000' } },
                left: { style: 'thin', color: { argb: '#000000' } },
                bottom: { style: 'thin', color: { argb: '#000000' } },
                right: { style: 'thin', color: { argb: '#000000' } }
              };
            }
          }

          /**
           * Ghi file excel
           */
          await workbook.xlsx.writeBuffer().then((data: any) => {
            let blob = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            FileSaver.saveAs(blob, `${fileNameExport ?? 'exportData'}.xlsx`);
          });
        }
      })
  }

  // TTSv2
  public DanhSachUngVien(dataForExport: any, fileNameExport?: string): void {

    if (dataForExport) {
      // đọc file template export
      this.httpClient.get('assets/ExcelTemplates/ThongKeUngVienTemplate.xlsx', { responseType: 'blob' })
        .subscribe((file: Blob) => {

          // xử lý file template sang obj Workbook 
          const workbook = new Workbook();
          let fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);

          fileReader.onload = async (e) => {
            let arrayBuffer = fileReader.result as ArrayBuffer;

            if (arrayBuffer)
              await workbook.xlsx.load(arrayBuffer);

            // lấy ra sheet cần xử lý
            let worksheet = workbook.getWorksheet('Sheet1');

            // tổng số dòng ban đầu
            let defaultTotalRow = worksheet.rowCount + 1;

            dataForExport.forEach((item: any, idx: any) => {
              worksheet.getCell(defaultTotalRow + idx, 1).value = idx + 1;
              worksheet.getCell(defaultTotalRow + idx, 2).value = item['chiNhanhTen'];
              worksheet.getCell(defaultTotalRow + idx, 3).value = item['maHocVien'];
              worksheet.getCell(defaultTotalRow + idx, 4).value = item['hoTenDem'];
              worksheet.getCell(defaultTotalRow + idx, 5).value = item['ten'];
              worksheet.getCell(defaultTotalRow + idx, 6).value = item['gioiTinh'];
              worksheet.getCell(defaultTotalRow + idx, 7).value = item['ngaySinh'] ? item['ngaySinh'].split("T")[0] : '';
              worksheet.getCell(defaultTotalRow + idx, 8).value = item['chuongTrinhTen'];
              worksheet.getCell(defaultTotalRow + idx, 9).value = item['ms1'];
              worksheet.getCell(defaultTotalRow + idx, 10).value = item['trangThai'];
              worksheet.getCell(defaultTotalRow + idx, 11).value = item['tenLopHienTai'];
              worksheet.getCell(defaultTotalRow + idx, 12).value = item['trungTuyenNhomTrungTuyen'];
              worksheet.getCell(defaultTotalRow + idx, 13).value = item['xuatCanhNhomXuatCanh'];
              worksheet.getCell(defaultTotalRow + idx, 14).value = item['dealId'];
              worksheet.getCell(defaultTotalRow + idx, 15).value = item['ngayKhaiGiang'] ? item['ngayKhaiGiang'].split("T")[0] : '';
            })

            /**
             * Format cell
            */
            for (var i = defaultTotalRow; i <= worksheet.rowCount; i++) {
              // set row height
              worksheet.getRow(i).height = 20;

              for (var j = 1; j <= worksheet.columnCount; j++) {

                // set alginment cell
                worksheet.getCell(i, j).alignment = ((j >= 2 && j <= 6) || j == 9) ? { vertical: 'middle', horizontal: 'left' } : { vertical: 'middle', horizontal: 'center' };

                worksheet.getCell(i, j).font = {
                  name: 'Times New Roman',
                  family: 2,
                  size: 12
                };

                // set border cell
                worksheet.getCell(i, j).border = {
                  top: { style: 'thin', color: { argb: '#000000' } },
                  left: { style: 'thin', color: { argb: '#000000' } },
                  bottom: { style: 'thin', color: { argb: '#000000' } },
                  right: { style: 'thin', color: { argb: '#000000' } }
                };
              }
            }

            /**
             * Ghi file excel
             */
            await workbook.xlsx.writeBuffer().then((data: any) => {
              let blob = new Blob([data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              });
              FileSaver.saveAs(blob, `${fileNameExport ?? 'exportData'}.xlsx`);
            });
          }
        })
    }
  }

  public async exportExcelSrv(templatePath: string, dataForExport: any, colForExport: any, listCellValue?: any, sheetName?: any, fileNameExport?: any) {
    try {
      if (!templatePath || !dataForExport || !colForExport) {
        throw new Error('Missing required parameter');
      }

      /**
       * Xử lý đọc file excel
       */
      const response = await fetch(templatePath);

      // kiểm tra file template được đọc có tồn tại hay ko
      if (!response.ok) {
        throw new Error('Failed to fetch template file');
      }
      const file = await response.blob();

      // convert file
      const workbook = new Workbook();
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = async (e) => {
        const arrayBuffer = fileReader.result as ArrayBuffer;

        if (arrayBuffer)
          await workbook.xlsx.load(arrayBuffer);

        // lấy ra sheet cần xử lý
        const worksheet = workbook.getWorksheet(`${sheetName ?? 'Sheet1'}`);

        /**
         * Xử lý gán giá trị vào các ô rời
         */
        listCellValue?.forEach((item: any) => {
          worksheet.getCell(item.cell).value = item.value;
        })

        // tổng số dòng ban đầu có trong file
        const defaultTotalRow = worksheet.rowCount + 1;

        /**
         * Ghi data vào excel
        */
        dataForExport.forEach((item: any, rowIndex: any) => {
          worksheet.getCell(defaultTotalRow + rowIndex, 1).value = rowIndex + 1;
          colForExport.forEach((colName: any, colIndex: any) => {
            const colNameLower = colName.charAt(0).toLowerCase() + colName.slice(1); // lowercase first chart
            worksheet.getCell(defaultTotalRow + rowIndex, colIndex + 2).value = item[colNameLower];  // bđ đổ data từ cột thứ 2 trong excel
          });
        });

        /**
         * Xuất file excel
         */
        await workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          FileSaver.saveAs(blob, `${fileNameExport ?? 'export'}.xlsx`);
        });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
