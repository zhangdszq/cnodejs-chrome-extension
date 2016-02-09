
(function(){
	'use strict';
	var topicUrl = 'https://cnodejs.org/topic/';
	var pageIndex = 1
	var limit = 10;

	$(function(){
		getTopics(pageIndex, limit);
		pageBtn();
		topicBtn();
	});

	function topicBtn () {
		$('#continer').on('click', '.topic', function(){
			var id = $(this).attr('id');

			var opt = {
				url : topicUrl + id
			}
			chrome.tabs.create(opt);
		})
	}

	function pageBtn() {
		$("#next").unbind('click').click(function(){
			pageIndex ++;
			getTopics(pageIndex, limit);
		});

		$("#prev").unbind('click').click(function(){
			if (pageIndex != 1) pageIndex --;
			getTopics(pageIndex, limit);
		});
	}

	function getTopics (pageIndex, limit) {
		var url = 'https://cnodejs.org/api/v1/topics';

		var data = {
			page : pageIndex,
			limit : limit,
			mdrender:false
		}

		$.get(url, data, function(result) {
			insertToPage(result.data);
		})
	}

	function insertToPage(topics) {
		var topicArr = [];

		for (var i = 0; i < topics.length; i++) {
			var topic = topics[i];
			var topicId = topic.id;
			var isTop = topic.top;
			var topicTitle = topic.title;

			var $topic = $('#topicTemplate').clone().show().attr('id', topicId);
			$topic.html(topicTitle);

			if (isTop) {
				$topic.addClass('topic-top');
			}

			topicArr.push($topic);
		};

		$("#continer").html(topicArr);
		topicArr = null;
	}

})();
