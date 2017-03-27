class AddWildcardsToMenus < ActiveRecord::Migration[5.0]
  def change
    add_column :menus, :wildcards, :json
  end
end
