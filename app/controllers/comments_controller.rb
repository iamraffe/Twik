class CommentsController < ApplicationController
  def index
    @comments = Comment.where(commentable_id: params[:menu_id])
    @user = current_user
  end

  def create
    @comment = Comment.create(comment_params.merge({commentable_id: params[:menu_id], commentable_type: "Menu"}))
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update_attributes(comment_params)
    @comment
  end

  def destroy
    @comment = Comment.find(params[:id])
    Comment.destroy(params[:id])
    @comment
  end

  def upvote
    @comment = Comment.find(params[:comment_id])
    @comment.upvote
  end

  private
    def comment_params
      params.required(:comment).permit(:body, :author, :parent_id)
    end
end
