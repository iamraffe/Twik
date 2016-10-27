class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :author
      t.text :body
      t.integer :rank, default: 0
      t.references :commentable, polymorphic: true, index: true
      t.timestamps null: false
    end
  end
end
