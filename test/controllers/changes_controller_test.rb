require "test_helper"

class ChangesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @change = changes(:one)
  end

  test "should get index" do
    get changes_url, as: :json
    assert_response :success
  end

  test "should create change" do
    assert_difference('Change.count') do
      post changes_url, params: { change: { horario_change: @change.horario_change, horario_fim_change: @change.horario_fim_change, hotfix: @change.hotfix, lead: @change.lead, link_change: @change.link_change, link_evidencia: @change.link_evidencia, numero_change: @change.numero_change, observacoes: @change.observacoes, qa: @change.qa, rollback: @change.rollback, squad: @change.squad, tribo: @change.tribo } }, as: :json
    end

    assert_response 201
  end

  test "should show change" do
    get change_url(@change), as: :json
    assert_response :success
  end

  test "should update change" do
    patch change_url(@change), params: { change: { horario_change: @change.horario_change, horario_fim_change: @change.horario_fim_change, hotfix: @change.hotfix, lead: @change.lead, link_change: @change.link_change, link_evidencia: @change.link_evidencia, numero_change: @change.numero_change, observacoes: @change.observacoes, qa: @change.qa, rollback: @change.rollback, squad: @change.squad, tribo: @change.tribo } }, as: :json
    assert_response 200
  end

  test "should destroy change" do
    assert_difference('Change.count', -1) do
      delete change_url(@change), as: :json
    end

    assert_response 204
  end
end
