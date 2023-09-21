import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CRUDService } from 'src/app/services/CRUD.service';

@Component({
  selector: 'app-detail-demo',
  templateUrl: './detail-demo.component.html',
  styleUrls: ['./detail-demo.component.css']
})
export class DetailDemoComponent implements OnInit {
  itemDetailModel: any = {
    id: 3,
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
  };

  constructor(
    private crudSrv: CRUDService,
    private notificationSrv: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  delete(id) {
    this.crudSrv.delete(id).then(
      (resp: any) => {
        if (resp.succeeded) {
          this.notificationSrv.success('Success', 'Đã xóa thành công');
          this.router.navigate(['/template/demo']);
        } else {
          this.notificationSrv.success('Error', resp.message);
        }
      }
    );
  }
}
