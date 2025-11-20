import { useState, useEffect } from "react";
import { profileService } from "../../services/profileService";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const [message, setMessage] = useState("");

  // 加载后端 JSON
  useEffect(() => {
    async function loadUser() {
      try {
        const res = await profileService.getUserProfile();
        setUserData(res);
        setFormData(res);
      } catch (err) {
        console.error("加载用户信息失败:", err);
      }
    }
    loadUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...userData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...userData });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({ ...formData });
    profileService.updateUserProfile(formData);
    setIsEditing(false);
    setMessage("个人资料更新成功");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleInput = (key: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  if (!userData || !formData) return <div className="p-6">加载中...</div>;

  // ===== 子组件：可编辑字段 =====
  const FieldRenderer = ({
    label,
    fieldKey,
    value,
    disabled,
    multiline,
    onChange,
  }: any) => {
    const [localValue, setLocalValue] = useState(value);

    // 当外部 value 变化时（比如取消编辑），更新本地状态
    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    const handleBlur = () => {
      // 只在失去焦点时更新父组件的状态
      onChange(localValue);
    };

    const handleChange = (newValue: string) => {
      setLocalValue(newValue);
    };

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {multiline ? (
          <textarea
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md h-24 ${disabled ? "bg-gray-100" : ""
              }`}
            value={localValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        ) : (
          <input
            disabled={disabled}
            className={`w-full px-3 py-2 border rounded-md ${disabled ? "bg-gray-100" : ""
              }`}
            value={localValue || ""}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={handleBlur}
          />
        )}
      </div>
    );
  };

  const FieldReadonly = ({ label, value }: any) => (
    <div className="flex w-full">
      <span className="flex-shrink-0 w-32 font-medium">{label}:</span>
      <span className="flex-1 break-all">{value}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">个人资料</h1>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            编辑资料
          </button>
        )}
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">
          {message}
        </div>
      )}

      {/* 编辑模式 */}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {Object.keys(formData).map((key) => (
            <FieldRenderer
              key={key}
              label={key}
              fieldKey={key}
              value={formData[key]}
              disabled={key === "id"}
              multiline={key === "brief"}
              onChange={(v: string) => handleInput(key, v)}
            />
          ))}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded-md"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              保存修改
            </button>
          </div>
        </form>
      ) : (
        // 展示模式
        <div className="space-y-6">
          <div className="flex flex-wrap">
            <img
              src={userData.avatarUrl}
              alt="头像"
              className="h-40 w-40 rounded-full object-cover border mr-8 flex-shrink-0"
            />
            <div className="space-y-2 text-gray-800 flex-1 min-w-0">
              {Object.keys(userData).map((key) => (
                <FieldReadonly key={key} label={key} value={String(userData[key])} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}