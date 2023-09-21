import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { CRUDService } from 'src/app/services/CRUD.service';

@Component({
  selector: 'app-page-demo',
  templateUrl: './page-demo.component.html',
  styleUrls: ['./page-demo.component.css']
})
export class PageDemoComponent implements OnInit {
  totalItems: number = 0;
  listData: any = [
    {
      id: 1,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 8,
      hiepHoi: 'AJNOMOTO',
      congTy: 'backup',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Phan Mạnh Quỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ABC'
    },
    {
      id: 2,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'đã duyệt',
      soLuongTienCu: 6,
      hiepHoi: 'ZORO',
      congTy: 'backup123',
      chuongTrinh: 'TTSV1',
      nguoiPhuTrach: 'Trần Tiến',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 1'
    },
    {
      id: 3,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 10,
      hiepHoi: 'AJNOMOTO',
      congTy: 'product 1',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Võ Huỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 324'
    },
    {
      id: 4,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 8,
      hiepHoi: 'AJNOMOTO',
      congTy: 'backup',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Phan Mạnh Quỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ABC'
    },
    {
      id: 5,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'đã duyệt',
      soLuongTienCu: 6,
      hiepHoi: 'ZORO',
      congTy: 'backup123',
      chuongTrinh: 'TTSV1',
      nguoiPhuTrach: 'Trần Tiến',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 1'
    },
    {
      id: 6,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 10,
      hiepHoi: 'AJNOMOTO',
      congTy: 'product 1',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Võ Huỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 324'
    },
    {
      id: 7,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'đã duyệt',
      soLuongTienCu: 6,
      hiepHoi: 'ZORO',
      congTy: 'backup123',
      chuongTrinh: 'TTSV1',
      nguoiPhuTrach: 'Trần Tiến',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 1'
    },
    {
      id: 8,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 10,
      hiepHoi: 'AJNOMOTO',
      congTy: 'product 1',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Võ Huỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 324'
    },
    {
      id: 9,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 8,
      hiepHoi: 'AJNOMOTO',
      congTy: 'backup',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Phan Mạnh Quỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ABC'
    },
    {
      id: 10,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'đã duyệt',
      soLuongTienCu: 6,
      hiepHoi: 'ZORO',
      congTy: 'backup123',
      chuongTrinh: 'TTSV1',
      nguoiPhuTrach: 'Trần Tiến',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 1'
    },
    {
      id: 11,
      maDonTuyen: 'HSSDADD',
      uuTien: 'Không',
      tinhTrang: 'chờ duyệt',
      soLuongTienCu: 10,
      hiepHoi: 'AJNOMOTO',
      congTy: 'product 1',
      chuongTrinh: 'TTSV2',
      nguoiPhuTrach: 'Võ Huỳnh',
      ngayTaoYC: '2023-11-09',
      ngayPhongVan: '2023-12-10',
      ghiChu: 'ghi chú 324'
    }
  ];
  prLoading: boolean = false;
  filterParams: any = {
    PageSize: 10,
    PageNumber: 1
  };
  editCache: any = {};
  showForm: boolean = false;
  donTuyenSelected: any = {};
  checkedAll: boolean = false;
  indeterminate: boolean = false;
  setOfCheckedId = new Set<number>();
  chinhSuaAvtive: boolean = false;

  constructor(
    private crudSrv: CRUDService,
    private notificationSrv: NzNotificationService
  ) { }

  ngOnInit() {
    this.updateEditCache(false);
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const { pageSize, pageIndex, sort, filter } = params;
    this.filterParams.PageNumber = pageIndex;
    this.filterParams.PageSize = pageSize;
    /* call API ở lần đầu tiên */
    // this.getList();
  }

  getList() {
    this.prLoading = true;
    this.crudSrv.getAll(this.filterParams).subscribe(
      (resp: any) => {
        if (resp.succeeded) {
          this.listData = resp.data;
          this.totalItems = resp.totalItems;
          this.prLoading = false;
        } else {
          this.notificationSrv.success('Error', resp.message);
        }
      }
    );
  }

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listData.findIndex(item => item.id === id);
    Object.assign(this.listData[index], this.editCache[id].data);
    this.editCache[id].edit = false;

    /* call API */
    // this.crudSrv.update(this.editCache[id].data).then(
    //   (resp: any) => {
    //     if (resp.succeeded) {
    //       this.notificationSrv.success('Success', 'Đã cập nhật thành công');
    //     } else {
    //       this.notificationSrv.success('Error', resp.message);
    //     }

    //     this.editCache[id].edit = false;
    //   }
    // );
  }

  updateEditCache(type) {
    this.listData.forEach(item => {
      this.editCache[item.id] = {
        edit: type,
        data: { ...item }
      };
    });

    this.prLoading = false;
  }

  saveForm() {
    this.crudSrv.create(this.donTuyenSelected).then(
      (resp: any) => {
        if (resp.succeeded) {
          this.notificationSrv.success('Success', 'Đã thêm mới thành công');
          this.closeForm();
          this.getList();
        } else {
          this.notificationSrv.error('Error', resp.message);
        }
      }
    );
  }

  closeForm() {
    this.showForm = false;
  }

  onAllChecked(checked: boolean): void {
    this.listData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listData.filter(({ disabled }) => !disabled);
    this.checkedAll = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checkedAll;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }


  fnGetItemSelect() {
    if (this.checkedAll) {
      return this.listData;
    } else {
      // parse setOfCheckedId to array
      const listSelect = Array.from(this.setOfCheckedId);
      // Sử dụng filter() và includes() để lấy ra list được chọn
      const listSubmit = this.listData.filter(item => listSelect.includes(item.id));
      return listSubmit; 
    }
  }  

  fnSaveUpdate() {
    const listSelect = this.fnGetItemSelect();
    // call api update list select
    console.log(listSelect); 
  }
  fnCancelUpdate() {
    this.chinhSuaAvtive = false;
    this.updateEditCache(false);
  }
  fnOpenEdit() {
    this.prLoading = true;
    this.chinhSuaAvtive = true;
    this.updateEditCache(true);
  }
  fnDelete() {}
}
