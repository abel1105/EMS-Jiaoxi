var page_url = document.location.href;

// 網址 regex
var ems_case_add = /EMCase\/EMCaseAdd\.jsp/g;   // 報案紀錄新增
var ems_aid_case_update = /AidCase\/AidCaseMTUpd\.jsp/g;  // 救護紀錄修改


function ems_aid_case_update_auto_help(){
	// 判斷是否為 救護紀錄修改 頁面
	if(ems_aid_case_update.test(page_url)){
		// 時間
		var $time_period = $('select[name="case_date_period"]'),
			$hour_input = $('input[name="hours"]'),
			$minute_input = $('input[name="minutes"]');

		$('select[name="case_date_period"]').change(function(){
			var $this = $(this);
			var value = $this.val(), time;
			chrome.storage.sync.get(function(storage){
				// --- 驗證狀態是否開啟 ---
				var status = storage.status;	// 狀態
				if(status !== 'open') return;
				// --- 驗證狀態是否開啟 ---
				switch(value){
					case "1": // 現場
						time = $('input[name="hourmin2"]').val();
						break;
					case "2": // 送醫途中
						time = $('input[name="hourmin3"]').val();
						break;
					case "3": // 到院後
						time = $('input[name="hourmin4"]').val();
						break;
				}
				set_time(time);
			});
		});

		// 到達現場時間
		$('input[name="hourmin2"]').change(function(){
			var $this = $(this);
			var value = $this.val();
			chrome.storage.sync.get(function(storage){
				// --- 驗證狀態是否開啟 ---
				var status = storage.status;	// 狀態
				if(status !== 'open') return;
				// --- 驗證狀態是否開啟 ---
				if(value.length !== 4) return; // 尚未完成
				if($time_period.val() != 1) return; // 時間點非 現場(字串)
				set_time(value);
			});
		});

		// 離開現場時間
		$('input[name="hourmin3"]').change(function(){
			var $this = $(this);
			var value = $this.val();
			chrome.storage.sync.get(function(storage){
				// --- 驗證狀態是否開啟 ---
				var status = storage.status;	// 狀態
				if(status !== 'open') return;
				// --- 驗證狀態是否開啟 ---
				if(value.length !== 4) return; // 尚未完成
				if($time_period.val() != 2) return; // 時間點非 送醫途中(字串)
				set_time(value);
			});
		});

		// 送達醫院時間
		$('input[name="hourmin4"]').change(function(){
			var $this = $(this);
			var value = $this.val();
			chrome.storage.sync.get(function(storage){
				// --- 驗證狀態是否開啟 ---
				var status = storage.status;	// 狀態
				if(status !== 'open') return;
				// --- 驗證狀態是否開啟 ---
				if(value.length !== 4) return; // 尚未完成
				if($time_period.val() != 3) return; // 時間點非 到院後(字串)
				set_time(value);
			});
		});

		
		chrome.storage.sync.get(function(storage){
			// --- 驗證狀態是否開啟 ---
			var status = storage.status;	// 狀態
			if(status !== 'open') return;
			// --- 驗證狀態是否開啟 ---

			// 初始時間
			var value;
			switch($time_period.val()){
				case '1':
					value = $('input[name="hourmin2"]').val();
					break;
				case '2':
					value = $('input[name="hourmin3"]').val();
					break;
				case '3':
					value = $('input[name="hourmin4"]').val();
					break;
			}
			if(value.length == 4) set_time(value); // 尚未完成

			// CSS
			// 修改 救護人員 select 樣式
			$("head").append('<style type="text/css">select[name="Source_Nurse"]{width: 300px;} select[name="Source_Nurse"] option{width: 50px; float: left;}</style>');

		});


		function pad(n, width=3, z=0) {return (String(z).repeat(width) + String(n)).slice(String(n).length)}


		function add_one_minute(hour, minute) {
			// 23, 59 => 00, 00
			hour = parseInt(hour);
			minute = parseInt(minute);
			// 加 1 分
			minute++;
			// 如果剛好整點
			if(minute === 60){
				minute = 0;
				hour++;
				if(hour === 24){
					hour = 0;
				}
			}
			hour = pad(hour, 2);
			minute = pad(minute, 2);
			return [
				hour,
				minute
			];
		}

		function set_time(value){
			// 切割字串
			var hour = value.substring(0, 2);
			var minute = value.substring(2, 4);
			var add_one_minute_time = add_one_minute(hour, minute);
			// 設定時間
			$hour_input.val(add_one_minute_time[0]);
			$minute_input.val(add_one_minute_time[1]);
		}
	}
}


ems_aid_case_update_auto_help();


// chrome.storage.onChanged.addListener(function (value, areaName){
// 	console.log("change", value, areaName);
// 	var newStatus = value.status.newValue;
// 	if(newStatus === 'open'){
// 		ems_aid_case_update_auto_help();
// 	}
// });




