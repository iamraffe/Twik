class CreateArchives < ActiveRecord::Migration[5.0]
  def change
    create_table :archives do |t|
      t.datetime :version
      t.string :name
      t.json :content
      t.timestamps
    end
  end
end
