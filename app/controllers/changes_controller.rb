class ChangesController < ApplicationController
  before_action :set_change, only: [:show, :update, :destroy]

  # GET /changes
  def index
    @changes = Change.all
    total_lines = Change.count(params[:id])
    json = JSON.parse(@changes.to_json)

    teste = {
      "total_lines": total_lines,
      "rows": json
    }

    puts teste
    render json: teste
  end

  # GET /changes/1
  def show
    render json: @change
  end

  # POST /changes
  def create
    @change = Change.new(change_params)

    if @change.save
      render json: @change, status: :created, location: @change
    else
      render json: @change.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /changes/1
  def update
    if @change.update(change_params)
      render json: @change
    else
      render json: @change.errors, status: :unprocessable_entity
    end
  end

  # DELETE /changes/1
  def destroy
    @change.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_change
      @change = Change.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def change_params
      params.require(:change).permit(:qa, :tribo, :squad, :numero_change, :link_change, :rollback, :hotfix, :horario_change, :horario_fim_change, :lead, :link_evidencia, :observacoes)
    end
end
