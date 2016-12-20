class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.text :description
      t.json :meta
      t.references :template, index: true
      t.timestamps null: false
    end
  end
end
