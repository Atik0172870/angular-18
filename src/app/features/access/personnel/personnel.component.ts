import { Component, OnInit } from '@angular/core';
import { APBAreaVm, ApbControlVm, BadgeAccessVm, BadgeVm, SupervisorInfoVm, DefaultAccessGroupVm, DepartmentInfoVm, LocationInfoVm, MAccGrpVm, PersonVm, ShuntVm, ThreatLevelBadgeCategoryVm, GenderVm } from '../../../model/personnel/personnel';
import { Observable } from 'rxjs';
import { menuTab, menuTabItems } from 'src/app/common/Tab/commonTab';
import { PersonnelService } from 'src/app/services/personnel-service/personnel.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  personData: PersonVm = {} as PersonVm;
  personDataObs: Observable<PersonVm> = {} as Observable<PersonVm>;
  selectedBadge: BadgeVm = {} as BadgeVm;
  dropDownAccessGroup: MAccGrpVm[] = [] as MAccGrpVm[];
  isRefresh: boolean = false;
  selectedTab: number = 1;
  menuTab: menuTabItems = new menuTabItems();
  apbAreaFilterList: Array<APBAreaVm> = new Array<APBAreaVm>();
  selectedApbArea: APBAreaVm = {} as APBAreaVm;
  selectedShunt: ShuntVm = {} as ShuntVm;
  shuntFilterList: Array<ShuntVm> = new Array<ShuntVm>();
  selectedSupervisor: SupervisorInfoVm = {} as SupervisorInfoVm;
  selectedDepartmentInfo: DepartmentInfoVm = {} as DepartmentInfoVm;
  selectedLocationInfo: LocationInfoVm = {} as LocationInfoVm;
  supervisorInfoFilterList: Array<SupervisorInfoVm> = new Array<SupervisorInfoVm>();
  departmentInfoFilterList: Array<DepartmentInfoVm> = new Array<DepartmentInfoVm>();
  locationInfotFilterList: Array<LocationInfoVm> = new Array<LocationInfoVm>();
  selectedGender: GenderVm = {} as GenderVm;


  constructor(private service: PersonnelService) { }

  ngOnInit(): void {
    this.menuTab.tabList.push({ id: 1, name: 'Personnel Information' });
    this.menuTab.tabList.push({ id: 2, name: 'Controls' });
    this.menuTab.tabList.push({ id: 3, name: 'User Info' });
    this.menuTab.tabList.push({ id: 4, name: 'Other' });

    this.getBadge();
  }
  setMenuTab = (selctedTab: menuTab) => {
    this.menuTab.selectedTab = selctedTab;
  }
  getBadge = () => {
    this.selectedTab = 1;
    this.personDataObs = this.service.getBadges();
    let sub = this.personDataObs.subscribe(
      {
        next: (personData: PersonVm) => {
          console.log(personData);
          this.personData = personData;
          this.onBadgeSelect(personData.badgeList[0]);
        },
        error: (e) => console.error(e),
        complete: () => {
          console.info('complete');
          sub.unsubscribe();
        }
      }
    )
  }


  onBadgeSelect = (badge: BadgeVm) => {
    badge.isExpand = !badge.isExpand;
    this.selectedBadge = badge;
    if (this.selectedBadge.dateOfBirth) {
      this.selectedBadge.dateOfBirth = formatDate(this.selectedBadge.dateOfBirth, 'yyyy-MM-dd', 'en-US')
    }
    if (this.selectedBadge.hireDate) {
      this.selectedBadge.hireDate = formatDate(this.selectedBadge.hireDate, 'yyyy-MM-dd', 'en-US')
    }
    this.selectedBadge.facilityDisplay = this.selectedBadge.facility ? this.selectedBadge.facility.toString() : 'Not Used';
    this.selectedBadge.reIssue = this.selectedBadge.issue ? this.selectedBadge.issue.toString() : 'Ingnore Issue #';
    this.selectedBadge.imgUrl = 'data:image/jpeg;base64,' + this.selectedBadge.badgeImage;
    this.selectedGender = {} as GenderVm;
    this.personData.genderList.map(item => {
      item.isUsed = false;
      if (item.gender == badge.gender) {
        item.isUsed = true;
        this.selectedGender = item;
      }
    })
    this.setAccgroup(badge);
    this.setBadgeCategory(badge);
    this.setApbControl(badge);
    this.filterApbArea(badge);
    this.filterShunt(badge);
    this.filterSupervisorInfo(badge);
    this.filterDepartmentInfo(badge);
    this.filterLocationInfo(badge);
  }
  onSetGender = (selectedGender: GenderVm) => {
    this.selectedGender = {} as GenderVm;
    this.personData.genderList.map(item => {
      item.isUsed = false;
    });
    selectedGender.isUsed = true;
    this.selectedGender = selectedGender;
  }

  onSelectDropDown = (dfltAccGrp: DefaultAccessGroupVm, maccGrp: MAccGrpVm) => {
    dfltAccGrp.selectedAccessGroup.aGroupNo = maccGrp.agrpNo;
    dfltAccGrp.selectedAccessGroup.description = maccGrp.description;
  }
  private setAccgroup = (badge: BadgeVm) => {
    this.dropDownAccessGroup = this.personData.mAccGrpList.filter(x => x.companyId == badge.companyId);
    this.personData.defaultAccessGroupList.forEach((dftAccGrp) => {
      dftAccGrp.isUsed = false;
      dftAccGrp.selectedAccessGroup = {} as BadgeAccessVm
    })
    const useAccGroupList = this.personData.badgeAccessList.filter(x => x.badge == badge.badge && x.companyId == badge.companyId && x.facility == badge.facility);
    useAccGroupList.forEach((item) => {
      let findAccess = this.personData.defaultAccessGroupList.find(x => x.seq == item.agSeq);
      if (findAccess) {
        const groupDescription = this.personData.mAccGrpList.find(x => x.agrpNo == item.aGroupNo && x.companyId == item.companyId);
        if (groupDescription) {
          item.description = groupDescription.description;
        }
        findAccess.isUsed = true;
        findAccess.selectedAccessGroup = item;
      }
    })
  }
  private setBadgeCategory = (badge: BadgeVm) => {
    this.personData.threatLevelBadgeCategoryList.forEach(item => item.isUsed = false);
    const getBadgeCatList = this.personData.badgeCategoryList.filter(x => x.badge == badge.badge && x.facility == badge.facility && x.companyId == badge.companyId);
    if (getBadgeCatList.length) {
      getBadgeCatList.forEach((item) => {
        let findCatItem = this.personData.threatLevelBadgeCategoryList.find(x => x.catNumber == item.catNumber);
        if (findCatItem) {
          findCatItem.isUsed = true;
        }
      })
    }
  }
  private setApbControl = (badge: BadgeVm) => {
    this.personData.apbControlList.map(item => {
      item.isUsed = false;
      if (item.id == badge.apbSet) {
        item.isUsed = true;
      }
    });
  }
  private filterApbArea = (badge: BadgeVm) => {
    this.apbAreaFilterList = this.personData.apbAreaList.filter(x => x.companyId == badge.companyId);
    this.apbAreaFilterList.map((item) => {
      item.isUsed = false;
      if (item.areaNo == badge.apbArea) {
        item.isUsed = true;
        this.selectedApbArea = item;
      }
    })
  }

  private filterShunt = (badge: BadgeVm) => {
    this.shuntFilterList = this.personData.shuntList.filter(x => x.companyId == 0 || x.companyId == badge.companyId);
    this.shuntFilterList.map((item) => {
      item.isUsed = false;
      if (item.shuntId == badge.shuntId) {
        item.isUsed = true;
        this.selectedShunt = item;
      }
    })
  }

  private filterSupervisorInfo = (badge: BadgeVm) => {
    this.selectedSupervisor = {} as SupervisorInfoVm;
    this.supervisorInfoFilterList = this.personData.supervisorInfoList.filter(x => x.companyID == badge.companyId);
    this.supervisorInfoFilterList.map((item) => {
      item.isUsed = false;
      if (item.personID == badge.personID) {
        item.isUsed = true;
        this.selectedSupervisor = item;
      }
    })
  }

  private filterDepartmentInfo = (badge: BadgeVm) => {
    this.selectedDepartmentInfo = {} as DepartmentInfoVm;
    this.departmentInfoFilterList = this.personData.departmentInfoList.filter(x => x.companyId == badge.companyId);
    this.departmentInfoFilterList.map((item) => {
      item.isUsed = false;
      if (item.departmentID == badge.deptId) {
        item.isUsed = true;
        this.selectedDepartmentInfo = item;
      }
    })
  }

  private filterLocationInfo = (badge: BadgeVm) => {
    this.selectedLocationInfo = {} as LocationInfoVm;
    this.locationInfotFilterList = this.personData.locationInfoList.filter(x => x.companyId == badge.companyId);
    this.locationInfotFilterList.map((item) => {
      item.isUsed = false;
      if (item.locationID == badge.locationId) {
        item.isUsed = true;
        this.selectedLocationInfo = item;
      }
    })
  }

  refresh = () => {
    this.isRefresh = true;
    this.getBadge();
    setTimeout(() => {
      this.isRefresh = false;
    }, 500); // Stop spinning after 1/2 second
  }
  setCategory = (catItem: ThreatLevelBadgeCategoryVm) => {
    catItem.isUsed = !catItem.isUsed;
  }
  setDurationUse = () => this.selectedBadge.durUse = !this.selectedBadge.durUse
  setExemptfromAPBAreaChecking = () => this.selectedBadge.mApbExempt = !this.selectedBadge.mApbExempt
  setTrack = () => this.selectedBadge.track = !this.selectedBadge.track
  setEscorted = () => this.selectedBadge.escort = !this.selectedBadge.escort
  setSupervisor = () => this.selectedBadge.supervisor = !this.selectedBadge.supervisor
  setFirstInControl = () => this.selectedBadge.firstInControl = !this.selectedBadge.firstInControl
  setShuntByDesignatedReader = () => this.selectedBadge.shunt = !this.selectedBadge.shunt


  onSetApbControl = (selctedControl: ApbControlVm) => {
    this.apbAreaFilterList.map(item => {
      item.isUsed = false;
    });
    selctedControl.isUsed = true;
  }
  onSetSupervisorInfo = (selctedSupervisorInfo: SupervisorInfoVm) => {
    this.supervisorInfoFilterList.map(item => {
      item.isUsed = false;
    });
    selctedSupervisorInfo.isUsed = true;
    this.selectedSupervisor = selctedSupervisorInfo;

  }
  onSetDeparmentInfo = (selctedDepartmentInfo: DepartmentInfoVm) => {
    this.departmentInfoFilterList.map(item => {
      item.isUsed = false;
    });
    selctedDepartmentInfo.isUsed = true;
    this.selectedDepartmentInfo = selctedDepartmentInfo;

  }
  onSetLocationInfo = (selctedLocationInfo: LocationInfoVm) => {
    this.locationInfotFilterList.map(item => {
      item.isUsed = false;
    });
    selctedLocationInfo.isUsed = true;
    this.selectedLocationInfo = selctedLocationInfo;

  }


  onSetApbArea = (selctedApbArea: APBAreaVm) => {
    this.apbAreaFilterList.map(item => {
      item.isUsed = false;
    });
    selctedApbArea.isUsed = true;
    this.selectedApbArea = selctedApbArea;
  }
  onSetShunt = (selctedShunt: ShuntVm) => {
    this.shuntFilterList.map(item => {
      item.isUsed = false;
    });
    selctedShunt.isUsed = true;
    this.selectedShunt = selctedShunt;
  }
}
