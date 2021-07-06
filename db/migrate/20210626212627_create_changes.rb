class CreateChanges < ActiveRecord::Migration[6.1]
  def change
    create_table :changes do |t|
      t.string :qa
      t.string :tribo
      t.string :squad
      t.string :numero_change
      t.string :link_change
      t.boolean :rollback
      t.boolean :hotfix
      t.string :horario_change
      t.string :horario_fim_change
      t.string :lead
      t.string :link_evidencia
      t.string :observacoes

      t.timestamps
    end
  end
end
