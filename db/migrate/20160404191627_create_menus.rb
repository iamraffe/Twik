class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.string :orientation
      t.string :layout
      t.string :size
      t.string :title
      t.json :meta
      t.json :sections
      t.references :template, index: true
      t.references :society, index: true
      t.timestamps null: false
    end
  end
end
