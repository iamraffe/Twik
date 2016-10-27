class CreateUploads < ActiveRecord::Migration
  def change
    create_table :uploads do |t|
      t.references :mediable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end
