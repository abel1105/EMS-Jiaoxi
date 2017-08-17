
// 取得目前的 tab 資訊
// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//   console.log(tabs[0]);
// });

// 顯示目前設定

chrome.storage.sync.get(function(value){
	var status = value.status;	// 狀態
	if(typeof status === 'undefined'){
		status = 'open';
		chrome.storage.sync.set({'status': status}, function(){
			console.log("開啟")
		});
	}
	console.log(status);

	// 設定狀態
	if(status == 'open'){
		$('input[name="auto-help"]').attr("checked", true);
	}
	if(status == 'close'){
		$('input[name="auto-help"]').attr("checked", false);
	}
	
})

$("#fillForm").on("click", function(){
	// 引入 jquery
	chrome.tabs.executeScript({
		file: "jquery.min.js"
	});
	// 引入真正的 js 檔
	chrome.tabs.executeScript({
		file: "auto_fill.js"
	});
});

console.log(chrome.storage.sync);
$('input[name="auto-help"]').change(function(){
	var $this = $(this);
	// var value = $this.val();
	// switch(value){
	// 	case 'open':
	// 		chrome.storage.sync.set({'status': value}, function(){
	// 			console.log("開啟")
	// 		});
	// 		break;
	// 	case 'close':
	// 		chrome.storage.sync.set({'status': value}, function(){
	// 			console.log("關閉")
	// 		});
	// 		break;
	// }

	var is_checked = $this.is(':checked');
	if(is_checked){
		chrome.storage.sync.set({'status': 'open'}, function(){
				console.log("開啟")
		});
	}else{
		chrome.storage.sync.set({'status': 'close'}, function(){
				console.log("關閉")
		});
	}
});

