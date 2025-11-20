import { useState, useEffect } from "react";
import { recentService } from "../../services/recentService";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";


export default function RecentPage() {
  const [notice, setNotice] = useState<any | null>(null);
  const [event, setEvent] = useState<any | null>(null);

  const [isEditingNotice, setIsEditingNotice] = useState(false);
  const [isEditingEvent, setIsEditingEvent] = useState(false);
  const [backupEvent, setBackupEvent] = useState<any | null>(null);
  const [backupNotice, setBackupNotice] = useState<any | null>(null); // 添加公告备份

  const [previewMarkdown, setPreviewMarkdown] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function load() {
      const n = await recentService.getRecentNotices();
      const e = await recentService.getRecentEvents();

      const noticeList = Array.isArray(n) ? n : n.data || [];
      const eventList = Array.isArray(e) ? e : e.data || [];

      const firstNotice = noticeList[0] || null;
      const firstEvent = eventList[0] || null;


      setNotice(firstNotice);
      setEvent(firstEvent);

      if (firstEvent?.url) {
        await fetchMarkdownContent(firstEvent.url);
      }
    }

    load();
  }, []);
  async function fetchMarkdownContent(url: string) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const text = await response.text();
        setPreviewMarkdown(text);
      } else {
        console.error("Failed to fetch markdown content");
        setPreviewMarkdown("# 无法加载内容");
      }
    } catch (error) {
      console.error("Error fetching markdown:", error);
      setPreviewMarkdown("# 加载内容时出错");
    }
  }
  function showMessage(msg: string) {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  }

  // 保存公告
  async function saveNotice() {
    if (notice) {
      await recentService.addRecentNotices(notice);
      showMessage("公告已保存");
      setIsEditingNotice(false);
    }
  }

  // 上传并保存事件文件
  async function saveEvent() {
    if (!selectedFile) {
      showMessage("请先选择 Markdown 文件");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await recentService.addRecentEvents(formData); // 后端接口接收文件
      showMessage("事件文件已上传");
      setIsEditingEvent(false);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
      showMessage("上传失败");
    }
  }

  // 上传 markdown 文件，预览
  function handleMarkdownUpload(file: File) {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setEvent((prev: any) => ({ ...prev, content: text }));
      setPreviewMarkdown(text);
    };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6 space-y-10">
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md">{message}</div>
      )}

      {/* 公告区 */}
      <section className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">公告 Notice</h2>
          {!isEditingNotice && (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                setBackupNotice(notice); // 点击编辑时备份当前公告
                setIsEditingNotice(true);
              }}
            >
              编辑
            </button>
          )}
        </div>

        {isEditingNotice ? (
          <>
            <textarea
              className="w-full border border-gray-300 rounded-md p-3 bg-white"
              value={notice?.content || ""}
              onChange={(e) => setNotice({ ...notice, content: e.target.value })}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={() => {
                  setNotice(backupNotice); // 取消时恢复备份的公告
                  setIsEditingNotice(false);
                }}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={saveNotice}
              >
                保存
              </button>
            </div>
          </>
        ) : (
          notice ? (
            <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div>
                <p className="text-sm text-gray-600 font-medium">{notice.date}</p>
                <p>{notice.content}</p>
              </div>
            </div>
          ) : (
            <div>
              暂无公告
            </div>
          )
        )}
      </section>

      {/* 事件区 */}
      <section className="bg-white p-4 rounded-lg shadow space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">动态 Event</h2>
          {!isEditingEvent && (
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                setBackupEvent(event);
                setIsEditingEvent(true);
              }}
            >
              编辑
            </button>
          )}
        </div>

        <div className="markdown-body">
          <ReactMarkdown>
            {previewMarkdown}
          </ReactMarkdown>
        </div>

        {isEditingEvent && (
          <div className="mt-4 space-y-3">
            <input
              type="file"
              accept=".md"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleMarkdownUpload(file);
              }}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
                onClick={() => {
                  setEvent(backupEvent);
                  setPreviewMarkdown(backupEvent?.content || "");
                  setSelectedFile(null);
                  setIsEditingEvent(false);
                }}
              >
                取消
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={saveEvent}
              >
                上传并保存
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}