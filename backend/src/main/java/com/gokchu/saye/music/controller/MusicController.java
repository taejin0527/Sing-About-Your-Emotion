package com.gokchu.saye.music.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gokchu.saye.music.service.MusicService;
import com.gokchu.saye.music.service.YoutubeService;
import com.gokchu.saye.repository.dto.Music;

@RestController
@RequestMapping("/music")
public class MusicController {

	@Autowired
	MusicService musicService;
	@Autowired
	YoutubeService youtubeService;

	// 인기도 순서로 출력
	@GetMapping("popularity")
	public List<Music> selectByPopularity() {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectBymCnt();
		return musics;
	}

	// 발매일 순서로 출력
	@GetMapping("date")
	public List<Music> selectByDate() {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByDate();
		return musics;
	}

	// 제목으로 검색
	@GetMapping("title")
	public List<Music> selectByTitle(String mTitle) {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByTitle(mTitle);
		return musics;
	}

	// 가수로 검색
	@GetMapping("artist")
	public List<Music> selectByArtist(String mArtist) {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByArtist(mArtist);
		return musics;
	}

	// 앨범으로 검색
	@GetMapping("album")
	public List<Music> selectByAlbum(String mAlbum) {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByAlbum(mAlbum);
		return musics;
	}

	// 장르로 검색
	@GetMapping("genre")
	public List<Music> selectByGenre(String mGenre) {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByGenre(mGenre);
		return musics;
	}

	// 감정으로 검색
	@GetMapping("emotion")
	public List<Music> selectByEmotion(String mEmotion) {
		List<Music> musics = new ArrayList<>();
		musics = musicService.selectByEmotion(mEmotion);
		return musics;
	}

	// 감정으로 랜덤검색
	@GetMapping("randGenre")
	public List<Music> selectByrandGenre(String mEmotion) {
		List<Music> musics = new ArrayList<>();
		String mGenre = "dance";
		switch (mEmotion) {
		case "기쁨":
			mGenre = "dance";
			break;
		case "슬픔":
			mGenre = "country";
			break;
		case "기대":
			mGenre = "pop";
			break;
		case "신뢰":
			mGenre = "electro";
			break;
		case "놀라움":
			mGenre = "modern";
			break;
		case "혐오":
			mGenre = "metal";
			break;
		case "공포":
			mGenre = "rock";
			break;
		case "분노":
			mGenre = "rock";
			break;
		}
		musics = musicService.selectByrandGenre(mGenre);
		return musics;
	}

	// DATA SET CONTROLLER
	@GetMapping("DATA SET CONTROLLER")
	public void updateMurl() {
		ArrayList<Music> youtube = new ArrayList<>();
		for (int i = 5000; i < 5125; i++) {
			Music music = musicService.selectByNo(i);
			if (music.getmUrl().equals("https://www.youtube.com/watch?v=") || music.getmUrl().equals("")) {
				music.setmUrl(music.getmTitle() + " " + music.getmArtist());
				youtube.add(music);
			}
		}
		ArrayList<Music> result = youtubeService.selectUrlByTitle(youtube);
		for (Music music : result) {
			musicService.updateMurlByNo(music.getmNo(), music.getmUrl());
			System.out.println(music.getmTitle());

		}
	}

	// 감정으로 검색
	@GetMapping("cnt")
	public void updateCnt(int mNo) {
		musicService.updateCnt(mNo);
	}
}
