class AddAttachmentMediableToUploads < ActiveRecord::Migration
  def self.up
    change_table :uploads do |t|
      t.attachment :mediable
    end
  end

  def self.down
    remove_attachment :uploads, :mediable
  end
end
