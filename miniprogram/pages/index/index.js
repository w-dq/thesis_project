const app = getApp()
Page({
  // tomap () {
  //   wx.navigateTo({
  //     url: '../map/map'
  //   })
  // },
  scanDevices(){
    console.log("abc")
    wx.startBeaconDiscovery({//开始搜索附近的iBeacon设备
      uuids: ['FDA50693-A4E2-4FB1-AFCF-C6EB07647825'],//参数uuid
      success: function (res) {
        //封装请求数据 
        console.log(res);
        console.log("inside");
        var beacons = res.beacons;
        var reqContent = {};
        var bleArray = [];
        for (var i = 0; i < beacons.length; i++) {
          var bleObj = {};
          bleObj.distance = beacons[i].accuracy;
          bleObj.rssi = beacons[i].rssi;
          bleObj.mac = beacons[i].major + ":" + beacons[i].minor;
          bleArray.push(bleObj);
          console.log("name");
        }
        reqContent.ble = bleArray;
        redisSave(reqContent);
      },
      fail: function (res) {
        //先关闭搜索再重新开启搜索,这一步操作是防止重复wx.startBeaconDiscovery导致失败
        console.log('fail');
      },
      complete: function(res) {
        console.log("complete");
      }
    })
  },
  onShareAppMessage () {
    return {
      title: '快来使用LBS定位小工具',
      imageUrl: '../../asset/logo.png'
    }
  }
})