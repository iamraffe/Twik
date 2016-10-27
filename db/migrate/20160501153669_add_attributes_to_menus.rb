class AddAttributesToMenus < ActiveRecord::Migration
  def change
    add_column :menus, :height, :float
    add_column :menus, :width, :float
    add_column :menus, :background, :string
  end
end
