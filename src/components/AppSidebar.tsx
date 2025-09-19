import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  DollarSign,
  Mail,
  StickyNote,
  Settings,
  User,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  count?: number;
}

const defaultCategories: Category[] = [
  { id: "schedule", title: "Schedule", icon: Calendar, color: "pastel-blue", count: 3 },
  { id: "finance", title: "Finance", icon: DollarSign, color: "pastel-mint", count: 2 },
  { id: "mail", title: "Mail Report", icon: Mail, color: "pastel-purple", count: 1 },
  { id: "notes", title: "Notes", icon: StickyNote, color: "pastel-gray", count: 5 },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isCollapsed = state === "collapsed";

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: newCategoryName.toLowerCase().replace(/\s+/g, "-"),
        title: newCategoryName,
        icon: StickyNote,
        color: "pastel-gray",
        count: 0,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(categories.filter(cat => cat.id !== categoryId));
  };

  return (
    <Sidebar className={`${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}>
      <SidebarHeader className="border-b border-sidebar-border/60 pb-4">
        {!isCollapsed && (
          <div className="px-2">
            <h2 className="text-lg font-semibold text-sidebar-foreground mb-1">TaskFlow AI</h2>
            <p className="text-xs text-sidebar-foreground/60">Organize your life intelligently</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 mb-2">
            {!isCollapsed && "Categories"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id} className="group">
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={`/category/${category.id}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? `bg-${category.color}/20 text-sidebar-foreground font-medium border-l-2 border-${category.color}`
                            : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                        }`
                      }
                    >
                      <category.icon className={`h-5 w-5 flex-shrink-0`} />
                      {!isCollapsed && (
                        <>
                          <span className="flex-1 truncate">{category.title}</span>
                          {category.count && category.count > 0 && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                              {category.count}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                  {!isCollapsed && (
                    <div className="opacity-0 group-hover:opacity-100 absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 transition-opacity">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-sidebar-accent"
                        onClick={() => setEditingCategory(category.id)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
              
              {!isCollapsed && (
                <SidebarMenuItem>
                  {isAddingCategory ? (
                    <div className="flex gap-2 px-3 py-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Category name"
                        className="h-8 text-sm"
                        onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
                        autoFocus
                      />
                      <Button size="sm" onClick={handleAddCategory} className="h-8 px-2">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-3 px-3 py-2.5 text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      onClick={() => setIsAddingCategory(true)}
                    >
                      <Plus className="h-5 w-5" />
                      Add Category
                    </Button>
                  )}
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/60 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary/20 text-sidebar-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`
                }
              >
                <User className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Profile</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary/20 text-sidebar-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`
                }
              >
                <Settings className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>Settings</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}