class CreateImages < ActiveRecord::Migration[5.0]
  def change
    create_table :images do |t|
      t.string :title
      t.attachment :file
      t.boolean :private
      t.references :imageable, polymorphic: true, index: true
      t.references :user, index: true
      t.timestamps
    end
  end
end
