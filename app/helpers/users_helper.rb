module UsersHelper
  def user_status(user)
    if current_account.owner == user || user.invitation_accepted?
      content_tag(:span, '', class: "fa fa-check text-success")
    else
      "Invitation Pending"
    end
  end
end
