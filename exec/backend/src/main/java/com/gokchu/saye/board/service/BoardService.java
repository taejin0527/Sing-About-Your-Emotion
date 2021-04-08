package com.gokchu.saye.board.service;

import java.util.List;

import com.gokchu.saye.repository.dto.Board;

public interface BoardService {

	/* C :: 게시판 생성 */
	int insertBoard(Board board) throws Exception;

	/* R :: 게시판 조회 */
	List<Board> selectBoard(String key, String word) throws Exception;

	/* R :: 게시판 상세 조회 */
	Board selectDetailBoard(int bNo) throws Exception;
	
	/* R :: 도움글 리스트 조회 */
	List<Board> selectHelpBoard() throws Exception;
	
	/* R :: 하소연 리스트 조회 */
	List<Board> selectSayBoard() throws Exception;
	
	/* U :: 게시판 수정 */
	boolean updateBoard(Board board) throws Exception;

	/* D :: 게시판 삭제 */
	boolean deleteBoard(int bUNo, int bNo) throws Exception;

}