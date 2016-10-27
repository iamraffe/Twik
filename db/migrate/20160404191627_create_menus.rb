class CreateMenus < ActiveRecord::Migration
  def change
    create_table :menus do |t|
      t.string :name
      t.text :description
      t.json :template, :null => false, :default => "[]"
      t.timestamps null: false
    end
  end
end
