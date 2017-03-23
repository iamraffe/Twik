class AddWildcardsToTemplates < ActiveRecord::Migration[5.0]
  def change
    add_column :templates, :wildcards, :text, array: true, default: []
  end
end
